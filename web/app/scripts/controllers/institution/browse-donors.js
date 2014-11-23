'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('InstitutionBrowseDonorsCtrl', ['$scope', 'joinTables',
    function ($scope, joinTables) {
      $scope.checkUser();

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
                      var achievement = 0;
                      if(donations.length > 0) {
                        achievement = 1;
                      } else if(donations.length > 4){
                        achievement = 5;
                      } else if(donations.length > 9){
                        achievement = 10;
                      } else if(donations.length > 14){
                        achievement = 15;
                      }
                      $scope.donors.push({
                        userData: response.userData[0],
                        numberOfDonations: donations.length,
                        achievement: achievement
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
