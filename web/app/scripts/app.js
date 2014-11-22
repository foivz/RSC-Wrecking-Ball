'use strict';

/* global Parse */

angular
  .module('rscwbApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ]).run(['$rootScope', 'api', '$location', function ($rootScope, api, $location){
    Parse.initialize('Qz1N1B4aBwzmiszChrGKU37QalVXzZ8iew6hV2oH', 'nlsxXbzBGRIaZ7n2rouuK5dNQahzwjbbnaJQSPEj');

    $rootScope.changeView = function(view) {
      $location.path(view);
    };

    $rootScope.currentUser = undefined;

    // loading languages
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
