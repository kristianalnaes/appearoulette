"use strict";angular.module("clientApp",[]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("clientApp").controller("MainCtrl",["$scope","$http","socket",function(a,b,c){a.clientCount=0;var d=function(a){console.log(a.roomName)},e=function(){},f=function(){a.status="nexted",a.roomName=""},g=function(b){console.log("paired!"),console.log(b),a.status="found a match!",a.roomName=b.roomName},h=function(b){console.log(b),a.clientCount=b.clientCount};c.on("connected",e),c.on("room",d),c.on("clientCountUpdated",h),c.on("paired",g),c.on("nexted",f),a.randomize=function(){c.emit("getPairing"),a.status="searching",a.roomName=""}}]),angular.module("clientApp").factory("socket",["$rootScope",function(a){var b=io.connect("http://video-conference.skunklet-works.no:8443");return{on:function(c,d){b.on(c,function(){var c=arguments;a.$apply(function(){d.apply(b,c)})})},emit:function(c,d,e){b.emit(c,d,function(){var c=arguments;a.$apply(function(){e&&e.apply(b,c)})})}}}]);