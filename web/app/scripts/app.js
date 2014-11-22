'use strict';

/**
 * @ngdoc overview
 * @name rscwbApp
 * @description
 * # rscwbApp
 *
 * Main module of the application.
 */
angular
  .module('rscwbApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ]).run(['$rootScope', 'api', function ($rootScope, api){
    api.getLocalize('hr').then(function(response) {
      if (!response || !response.data) {
        console.log('Loading texts failed.');
      }

      $rootScope.lang = response.data;
    });
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
