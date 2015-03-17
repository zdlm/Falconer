/**
 * Created by leo on 3/17/15.
 */

//publish model
angular.module("newFalconer.models", [])
    .factory("model", function () {
        var publish = {},
            content = {},
            media = {},
            geo = {};
        publish.id = "";
        content.message = "";
        content.id = "";
        content.network = "";
        content.postType = "";
        media.fileName = "";
        media.url = "";
        content.media = media;
        publish.content = content;
        publish.tags = [];
        publish.status = "";
        publish.channels = [];
        publish.scheduled = new Date();
        geo.countries = [];
        geo.languages = [];
        geo.cities = [];
        geo.regions = [];
        publish.geo = geo;
        return publish;
    });
