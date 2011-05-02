var Backbone = require('./backbone');
var _ = require('underscore');
var express = require('express');

module.exports = Server;

function Server(plugin) {
    this.plugin = plugin;

    this.server = new express.createServer();

    // Stores models served by this server.
    this.models = {};

    this.initialize(plugin);
};

_.extend(Server.prototype, Backbone.Events, {
    initialize : function(plugin) {
        // Default implementation loads all components.
        var components = ['routers', 'controllers', 'models', 'views', 'templates'];
        components.forEach(function(kind) {
            for (var name in plugin[kind]) {
                plugin[kind][name].register(this);
            }
        }, this);
    },

    port: 3000,

    start: function() {
        this.server.listen(this.port);
        return this;
    },

    toString: function() {
        if (this.server) {
            return '[Server ' + this.constructor.title + ':' + this.server.address().port + ']';
        } else {
            return '[Server ' + this.constructor.title + ']';
        }
    }
});

Server.augment = Backbone.Controller.augment;
Server.extend = Backbone.Controller.extend;
Server.toString = function() {
    return '<Server ' + this.title + '>';
};
