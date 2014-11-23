'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('InstitutionBrowseDonorsCtrl', ['$scope',
    function ($scope) {
      var getDonors = function() {
        var Users = Parse.Object.extend('User');
        var query = new Parse.Query(Users);

        query.equalTo('type', 'donor');

        query.find({
          success: function(donors) {
            $scope.donors = donors;
            $scope.$apply();
          },
          error: function(donors, error) {
            console.log(donors);
          }
        });
      };

      getDonors();
    }]);
