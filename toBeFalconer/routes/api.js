var express = require('express');
var router = express.Router();
var dataPath = require("../constants").PATHS;
var opResult = require("../constants").RESULT;
var http = require('follow-redirects').http;
var uuid = require('node-uuid');
var _ = require('underscore');
var socketIO = require("socket.io");
var publishing = [];

router.socket = null;
router.socketServer = function(server){
    router.io = socketIO.listen(server);
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
        if(publishing.length > 0){
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

module.exports = router;
