var express = require('express');
var router = express.Router();
var dataPath = require("../constants").PATHS;
var http = require('follow-redirects').http;
var uuid = require('node-uuid');
var _ = require('underscore');

var publishing = null;
var reachData = null;
var start = 0;
var myInterval = null;

var socketio = require("socket.io");

router.socket = null;
router.socketServer = function(server){
    router.io = socketio.listen(server);
};


//register routes
//all the routs should be prefixed with /api
router.get('/', function(req, res, next) {
  res.send('api coming');
});

//publishing post api
router.route('/publishing')
    .post(function(req, res){
        var newOne = null;
        if(req.body.id){
            res.status(500).send('id should be empty!');
        }
        newOne = req.body;
        newOne.id = uuid.v1();
        publishing.push(newOne);
        router.io.sockets.emit('createPublishing',newOne);
        res.json({
            data:newOne,
            status: 'ok',
            message: 'publishing created!'
        });
    })
    .get(function(req,res){
        //return publishing, if the publishing is not null;
        if(publishing){
            res.json(publishing);
        }else{
            //get the new data from the api
            fetch(dataPath.HTTP_HOST + dataPath.HTTP_PUBLISH_API, function(result){
                if(result.data){
                    publishing = JSON.parse(result.data).response;
                    res.json(publishing);
                }else{
                    res.json({
                        data:[],
                        status: 'no',
                        message: 'can not get data!'
                    })
                }
            });
        }

    });

router.route('/publishing/:id')
    .get(function(req, res){
        if(!req.params.id){
            res.status(500).send('Invalid id param');
        }
        var result = _.find(publishing, function(item){
            return item.id === req.params.id;
        });
        if(result){
            res.json({
                data:result,
                status: 'ok',
                message: 'got it!'
            });
        }else{
            res.status(404).send('could not find!');
        }

    })
    .put(function(req, res){
        if(!req.params.id){
            res.status(500).send('Invalid id param');
        }else{
            var result = _.findIndex(publishing, function(item){
                return item.id === req.params.id;
            });
            if(result > -1){
                publishing[result] = req.body;
                res.json({
                    data:publishing[result],
                    status: 'ok',
                    message: 'updated!'
                });
            }else{
                res.status(404).send('could not find!');
            }
        }

    })
    .delete(function(req, res){
        if(!req.params.id){
            res.status(500).send('Invalid id param');
        }else{
            var result = _.findIndex(publishing, function(item){
                return item.id === req.params.id;
            });
            if(result > -1){
                publishing.splice(result,1);
                res.json({
                    data:publishing,
                    status: 'ok',
                    message: 'deleted!'
                });
            }else{
                res.status(404).send('could not find!');
            }
        }
    });

var fetch = function(url, callback){
    http.get(url, function(res){
        var body = "";

        res.on('data', function(chunk){
            body += chunk
        });

        res.on('end', function(){
            callback({
                data:body,
                error:null
            })
        })
    }).on('error', function(error){
        callback({
            data:null,
            error:error
        })
    });
};

//data transfer, generate the data resource
var toGraphData = function(original){
    var post_impressions = {
            key: "post_impressions",
            values:[]
        },
        post_impressions_organic = {
            key: "post_impressions_organic",
            values:[]
        },
        post_impressions_viral = {
            key: "post_impressions_viral",
            values:[]
        },
        post_impressions_paid = {
            key: "post_impressions_paid",
            values:[]
        };
    if(!original){
        return [];
    }
    _.each(original,function(item, i){
        if(item && item["post_impressions"] && item["post_impressions"][0]
            && item["post_impressions_organic"] && item["post_impressions_organic"][0]
            && item["post_impressions_viral"] && item["post_impressions_viral"][0]
            && item["post_impressions_paid"] && item["post_impressions_paid"][0]){
            var post_impressions_values = [i.toString(), parseInt(item["post_impressions"][0].value)];
            post_impressions.values.push(post_impressions_values);
            var post_impressions_organic_values = [i.toString(), parseInt(item["post_impressions"][0].value)];
            post_impressions_organic.values.push(post_impressions_organic_values);
            var post_impressions_viral_values = [i.toString(), parseInt(item["post_impressions_viral"][0].value)];
            post_impressions_viral.values.push(post_impressions_viral_values);
            var post_impressions_paid_values = [i.toString(), parseInt(item["post_impressions_paid"][0].value)];
            post_impressions_paid.values.push(post_impressions_paid_values);
        }
    });
    return [post_impressions, post_impressions_organic, post_impressions_viral, post_impressions_paid];
};

router.route("/graph")
    .get(function(req, res){

        getGraphData(function(data){
            res.json({
                status: 'ok',
                message: 'got ten data!'
            });
        });
    });

var getGraphData = function(callback){
    fetch(dataPath.HTTP_HOST + dataPath.HTTP_DATA_API, function(result){
        if(result.data){
            reachData = JSON.parse(result.data).response;
            callback(getTenData());
        }else{
            res.json({
                data:[],
                status: 'no',
                message: 'can not get data!'
            })
        }
    });
};

var getTenData = function(){
    if(start + 10 > reachData.length){
        start = 0;
    }else{
        start = start + 10;
    }
    var data = reachData.slice(start, start + 10);
    var result = toGraphData(data);
    router.io.sockets.emit('graphDataComing', result);
    if(!myInterval){
        myInterval = setInterval(getTenData, 10000);
    }
}

module.exports = router;
