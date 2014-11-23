'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('MainCtrl', ['$scope',
    function ($scope) {
      $scope.userData = {};

      $scope.onAddUserClick = function() {
        var user = new Parse.User();

        user.signUp({
          username: $scope.userData.username,
          password: $scope.userData.password,
          type: $scope.userData.type
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

      var currentUserID;
      $scope.onAddInstitutionDataClick = function() {
        currentUserID = $scope.currentUser.id;

        if ($scope.currentUser.get('type') === 'admin') {
          var Institutions = Parse.Object.extend('InstitutionData');
          var institutions = new Institutions();

          institutions.save({
            userObjectId: currentUserID,
            name: $scope.userData.name,
            city: $scope.userData.city,
            isActive: true
          },
          {
            success: function(user) {
              console.log('institution data added', user);
            },

            error: function(user, error) {
              console.log('error', error);
            }
          });
        } else if ($scope.currentUser.get('type') === 'donor') {
          currentUserID = $scope.currentUser.id;

          var UserData = Parse.Object.extend('UserData');
          var userData = new UserData();

          userData.save({
            userObjectId: currentUserID,
            name: $scope.userData.name,
            surname: $scope.userData.surname,
            bloodType: $scope.userData.bloodType
          },
          {
            success: function(user) {
              console.log('user data added', user);
            },

            error: function(user, error) {
              console.log('error', error);
            }
          });
        } else if ($scope.currentUser.get('type') === 'superadmin') {

        }
      };

      $scope.onAddInstitutionBloodClick = function() {
        if ($scope.currentUser.get('type') !== 'admin' && $scope.currentUser.get('type') !== 'superadmin' ) {
          window.alert('Ovaj user nije institucija. Neka institucije rade svoj posao!');
          return;
        }

        currentUserID = $scope.currentUser.id;

        var Blood = Parse.Object.extend('InstitutionBlood');
        var blood = new Blood();

        blood.save({
          userObjectId: currentUserID,
          bloodType: $scope.userData.bloodType,
          value: $scope.userData.value
        },
        {
          success: function(user) {
            console.log('user data added', user);
          },

          error: function(user, error) {
            console.log('error', error);
          }
        });
      };

      $scope.onAddDonation = function() {
        if ($scope.currentUser.get('type') !== 'admin' && $scope.currentUser.get('type') !== 'superadmin' ) {
          window.alert('Ovaj user nije institucija. Neka institucije rade svoj posao!');
          return;
        }
        currentUserID = $scope.currentUser.id;

        var UserDonation = Parse.Object.extend('UserDonation');
        var donation = new UserDonation;

        var UserData = Parse.Object.extend('UserData');
        var queryUserData = new Parse.Query(UserData);
        var bloodType = '';

        var InstitutionBlood = Parse.Object.extend('InstitutionBlood');
        var queryBlood = new Parse.Query(InstitutionBlood);



        queryUserData.equalTo('userObjectId', $scope.userData.userId);

        queryUserData.find({
          success: function(resultType) {
            bloodType = resultType[0].get('bloodType');

            queryBlood.equalTo('userObjectId', currentUserID);
            queryBlood.equalTo('bloodType', bloodType);

            queryBlood.find({
              success: function(resultBlood) {
                resultBlood[0].save({'value': (parseInt(resultBlood[0].get('value'))+1)+'' }, {
                  success: function(result) {
                    console.log('blood added');
                    donation.save({userObjectId: $scope.userData.userId, institutionObjectId: currentUserID, dateOfDonation: $scope.userData.date
                    },{
                      success: function(result) {
                        console.log('donation added');
                      },
                      error: function(result, error) {
                        console.log(error);
                      }
                    });
                  },
                  error: function(result, error){
                    console.log(error);
                  }
                });
              },
              error: function(result, error){
                console.log(error);
              }
            });
          },
          error: function(result, error) {
            console.log(error);
          }
        });
      };

      $scope.makePush = function() {
        Parse.Push.send({
          channels: ['all'],
          data: {
              alert: 'Hello you!',
              eventId: 'testID',
              time: '19:00',
              location: '17.11.2014.'
            }
          }
        );
      };

    }]);
