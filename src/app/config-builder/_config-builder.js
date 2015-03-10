angular.module('config-builder', ['ngRoute']);

angular.module('config-builder').config(function($locationProvider){
  $locationProvider.html5Mode(true)
});
