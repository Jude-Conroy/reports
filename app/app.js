"use strict";

angular.module("app", ["ngRoute", "ngMaterial", "ngMessages", "ngAnimate","ngAria", "ngPlacesMap", "chart.js", "framework"])
    .config(function ($locationProvider) { //config your locationProvider
        $locationProvider.html5Mode(true).hashPrefix('*');
    });

