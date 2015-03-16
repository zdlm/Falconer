/**
 * Created by leo on 3/14/15.
 */

var app = angular.module('newFalconer', ['ngWebSocket']);

app.factory('PublishingData', function($websocket) {
        // Open a WebSocket connection
        var dataStream = $websocket('wss://website.com/data');

        var collection = [];

        dataStream.onMessage(function(message) {
            console.log(message);
            collection.push(JSON.parse(message.data));
        });

        var methods = {
            collection: collection,
            get: function() {
                dataStream.send(JSON.stringify({ action: 'get' }));
            }
        };

        return methods;
    })

app.controller('indexController',function($scope, $http, PublishingData){
    $scope.publishingData = PublishingData;
    $scope.getData = function(callback){
        $http.get("/api/publishing")
            .success(function(data, status, headers, config) {
                callback(data);
            });
    };
    $scope.postData = function(publishing, callback){
        $http.post("/api/publishing",publishing)
            .success(function(data, status, headers, config){
                callback(data);
            });
    };
    $scope.getOne = function(id, callback){
        $http.get("/api/publishing/" + id)
            .success(function(data, status, headers, config){
                callback(data);
            });
    };
    $scope.updateOne = function(id, publishing, callback){
        $http.put("/api/publishing/" + id, publishing)
            .success(function(data, status, headers, config){
                callback(data);
            });
    };
    $scope.deleteOne = function(id, callback){
        $http.delete("/api/publishing/" + id)
            .success(function(data, status, headers, config){
                callback(data);
            });
    };
});
