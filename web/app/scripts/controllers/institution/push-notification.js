'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('InstitutionPushNotificationCtrl', ['$scope',
    function ($scope) {
      $scope.notificationInfo = {};

      $scope.pushNotification = function() {
        Parse.Push.send({
          channels: ['all'],
          data: {
              alert: 'Super duper notifikejsn',
              eventId: 'cop cop'
            }
          }
        );
      };
    }]);
