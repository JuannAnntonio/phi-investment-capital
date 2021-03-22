'use strict';
var app = angular.module('myApp',['ngSanitize']);
app.config(function($controllerProvider, $interpolateProvider, $locationProvider){      
    app.controller = $controllerProvider.register;
    $interpolateProvider.startSymbol('<%');
    $interpolateProvider.endSymbol('%>');

});
app.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }   
    // enable http caching
   $httpProvider.defaults.cache = false;
   // extra
   $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
   $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);