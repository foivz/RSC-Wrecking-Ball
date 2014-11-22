'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('LoginCtrl', ['$rootScope', '$scope', function ($rootScope, $scope) {
    $scope.loginClicked = false;
    $scope.loginUser = {};

    var user = new Parse.User();

    $scope.onLoginClick = function () {
      Parse.User.logIn($scope.loginUser.username, $scope.loginUser.password, {
        success: function(user) {
          console.log('user logged in', user);
          $rootScope.currentUser = Parse.User.current();
          $scope.changeView('/');
          $scope.$apply();
        },
        error: function(user, error) {
          console.log('error', error);
        }
      });
    };

    $scope.onRegisterClick = function() {
      user.signUp({
        username: $scope.loginUser.username,
        password: $scope.loginUser.password,
        isDonor: false
      },
      {
        success: function(user) {
          console.log('user registered', user);
        },

        error: function(user, error) {
          console.log('error', error);
        }
      });
    };

  }]);
