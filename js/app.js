'use strict';

var appModule = appModule || {};
var appModule = angular.module('app', ['ngRoute'])
    .config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/home-page.html',
                controller: 'HomeController'
            })
            .when('/add', {
                templateUrl: 'templates/add-page.html',
                controller: 'AddController'
            })
            .otherwise({
                redirectTo: '/'
            });
            
            $locationProvider.hashPrefix('');
    })
    .run(function () {
    });
