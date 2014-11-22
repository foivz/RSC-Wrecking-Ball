'use strict';

angular.module('rscwbApp')
  .controller('SuperadminEditCtrl', ['$scope', '$routeParams', 'joinTables',
    function ($scope, $routeParams, joinTables) {
      var institutionID = $routeParams.id;

      $scope.institution = {};

      joinTables.join(institutionID).then(
        function(results) {
          $scope.institution.name = results.institution.get('name');
          $scope.institution.city = results.institution.get('city');
        }, function(error) {
          console.log(error);
        }
      );

      $scope.updateInfo = function() {
        joinTables.join(institutionID).then(
          function(results) {
            results.institution.save({
              name: $scope.institution.name,
              city: $scope.institution.city
            },
            {
              success: function(res) {
                console.log('institution updated');
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

    }]);
