'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('InstitutionBrowseDonorsCtrl', ['$scope', 'joinTables',
    function ($scope, joinTables) {
      var getDonors = function() {
        var Users = Parse.Object.extend('User');
        var query = new Parse.Query(Users);

        query.equalTo('type', 'donor');

        $scope.donors = [];

        query.find({
          success: function(donors) {
            for (var i = 0; i < donors.length; i++) {
              joinTables.join(donors[i].id).then(function(response) {
                if (response.userData) {
                  var UserDonation = Parse.Object.extend('UserDonation');
                  var queryDonation = new Parse.Query(UserDonation);
                  queryDonation.equalTo('userObjectId', response.userData[0].get('userObjectId'));

                  queryDonation.find({
                    success: function(donations) {
                      $scope.donors.push({
                        userData: response.userData[0],
                        numberOfDonations: donations.length
                      });
                      $scope.$apply();
                    },
                    error: function(donations, error) {
                      console.log(error);
                    }
                  });
                }
              });
            }
          },
          error: function(donors, error) {
            console.log(donors);
          }
        });
      };

      getDonors();

      $scope.onAddDonationClick = function() {
        // this.donor
      };
    }]);
