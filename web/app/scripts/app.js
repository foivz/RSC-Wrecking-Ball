'use strict';

/* global Parse */

angular
  .module('rscwbApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ]).run(['$rootScope', 'api', '$location', '$cookieStore', function ($rootScope, api, $location, $cookieStore) {
    Parse.initialize('Qz1N1B4aBwzmiszChrGKU37QalVXzZ8iew6hV2oH', 'nlsxXbzBGRIaZ7n2rouuK5dNQahzwjbbnaJQSPEj');
// debugger
    $rootScope.changeView = function(view) {
      $location.path(view);
    };

    $rootScope.currentUser = undefined;

    // loading languages
    $rootScope.loadTexts = function(language) {
      api.getLocalize(language).then(function(response) {
        if (!response || !response.data) {
          console.log('Loading texts failed.');
        }

        $rootScope.lang = response.data;
      });
    };

    $rootScope.loadTexts('en');

    $rootScope.checkUser = function() {
      if (!$rootScope.currentUser) {
        if ($cookieStore.get('currentUser')) {
          $rootScope.currentUser = angular.fromJson($cookieStore.get('currentUser'));
        } else {
          $rootScope.changeView('login');
        }
      }
    };

    $rootScope.logOut = function() {
      console.log('odjava');
      $cookieStore.remove('currentUser');
      $rootScope.changeView('login');
    };
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
      .when('/institution/home', {
        templateUrl: 'views/institution/home.html',
        controller: 'InstitutionHomeCtrl'
      })
      .when('/institution/info', {
        templateUrl: 'views/institution/info.html',
        controller: 'InstitutionInfoCtrl'
      })
      .when('/superadmin/home', {
        templateUrl: 'views/superadmin/home.html',
        controller: 'SuperadminHomeCtrl'
      })
      .when('/superadmin/edit/:id', {
        templateUrl: 'views/superadmin/edit.html',
        controller: 'SuperadminEditCtrl'
      })
      .when('/superadmin/edit', {
        templateUrl: 'views/superadmin/edit.html',
        controller: 'SuperadminEditCtrl'
      })
      .when('/institution/push-notification', {
        templateUrl: 'views/institution/push-notification.html',
        controller: 'InstitutionPushNotificationCtrl'
      })
      .when('/institution/browse-donors', {
        templateUrl: 'views/institution/browse-donors.html',
        controller: 'InstitutionBrowseDonorsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);
