'use strict';

/**
 * @ngdoc function
 * @name rscwbApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the rscwbApp
 */
angular.module('rscwbApp')
  .controller('LoginCtrl', ['$scope', function ($scope) {
    $scope.loginClicked = false;
    $scope.lang = {
      login: "Login",
      singup: "Sign up",
      username: "Username",
      password: "Password",
      submit: "Submit"
    }
  }]);
