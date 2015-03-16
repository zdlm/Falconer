/**
 * Created by leo on 3/14/15.
 */

angular.module('newFalconer.controllers', [])
    .controller("publishingCtrl", function($scope, $http, socket, model){

        socket.on('createPublishing', function (item) {
            $scope.publishs.push(item);
        });

        $scope.getData = function(){
            $http.get("/api/publishing")
                .success(function(data, status, headers, config) {
                    $scope.publishs = data;
                });
        };

        $scope.showPublishing = function(publishing){
            if(publishing){
                $scope.publish = publishing;
            }else{
                $scope.publish = model;
            }
        };

        $scope.save = function(publishing){
            //update
            if(publishing.id){
                $http.put("/api/publishing/" + publishing.id, publishing)
                    .success(function(data, status, headers, config){
                        var result = _.findIndex(publishing, function(item){
                            return item.id === publishing.id;
                        });
                        if(result > -1){
                            $scope.publishs[result] = publishing;
                        }
                    });
            }else{//create
                $http.post("/api/publishing",publishing)
                    .success(function(data, status, headers, config){
                        //call socket
                    });
            }
        };

        $scope.deleteOne = function(id, callback){
            var result = confirm("do you want to delete the item?");
            if(result){
                $http.delete("/api/publishing/" + id)
                    .success(function(data, status, headers, config){
                        var result = _.findIndex($scope.publishs, function(item){
                            return item.id === id;
                        });
                        if(result > -1){
                            $scope.publishs.splice(result,1);
                        }
                    });
            }
        };
        $scope.getData();

        /**
         * api test
         $scope.getData = function(callback){
            $http.get("/api/publishing")
                .success(function(data, status, headers, config) {
                    $scope.publishs = data;
        });
         $scope.postData = function(publishing, callback){
            $http.post("/api/publishing",publishing)
                .success(function(data, status, headers, config){

                });
        };
         $scope.getOne = function(id, callback){
            $http.get("/api/publishing/" + id)
                .success(function(data, status, headers, config){

                });
        };
         $scope.updateOne = function(id, publishing, callback){
            $http.put("/api/publishing/" + id, publishing)
                .success(function(data, status, headers, config){

                });
        };
        $scope.deleteOne = function(id, callback){
        var result = confirm("do you want to delete the item?");
        if(result){
            $http.delete("/api/publishing/" + id)
                .success(function(data, status, headers, config){

                });
        }
        };
         */
});
