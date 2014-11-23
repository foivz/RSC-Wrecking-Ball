'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('SuperadminEditCtrl', ['$scope', '$routeParams', 'joinTables',
    function ($scope, $routeParams, joinTables) {
      $scope.institutionID = $routeParams.id;

      $scope.institution = {};

      if ($scope.institutionID) {
        joinTables.join($scope.institutionID).then(
          function(results) {
            $scope.institution.name = results.institution.get('name');
            $scope.institution.city = results.institution.get('city');
          }, function(error) {
            console.log(error);
          }
        );
      }

      $scope.updateInfo = function() {
        joinTables.join($scope.institutionID).then(
          function(results) {
            results.institution.save({
              name: $scope.institution.name,
              city: $scope.institution.city
            },
            {
              success: function(res) {
                console.log('institution updated');
                $scope.changeView('superadmin/home');
                $scope.$apply();
              },
              error: function(res, error) {
                console.log(error);
              }
            });
          }, function(error) {
            console.log(error);
          }
        );
      };

      $scope.createInstitution = function() {
        var user = new Parse.User();

        user.signUp({
          username: $scope.institution.username,
          password: $scope.institution.password,
          email: $scope.institution.email,
          type: 'admin'
        },
        {
          success: function(inst) {
            var Institutions = Parse.Object.extend('InstitutionData');
            var institutions = new Institutions();

            institutions.save({
              userObjectId: inst.id,
              name: $scope.institution.name,
              city: $scope.institution.city,
              isActive: true
            },
            {
              success: function(user) {
                console.log('institution data added', user);
                $scope.changeView('superadmin/home');
                $scope.$apply();
              },

              error: function(user, error) {
                console.log('error', error);
              }
            });
          },
          error: function(inst, error) {
            console.log('error', inst);
          }
        });
      };

    }]);

