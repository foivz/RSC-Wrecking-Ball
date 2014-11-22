'use strict';
/* global Parse */

angular.module('rscwbApp')
  .controller('InstitutionPushNotificationCtrl', ['$scope',
    function ($scope) {
      $scope.notificationInfo = {};

      var select2 = $('#bloodtypes').select2();

      $scope.pushNotification = function() {
        console.log(select2.val());

        var Events = Parse.Object.extend('Events');
        var events = new Events();

        events.save({
          name: $scope.notificationInfo.name,
          time: $scope.notificationInfo.time,
          location: $scope.notificationInfo.location
        },
        {
          success: function(event) {
            console.log('new event created');

            Parse.Push.send({
              where: '',
              channels: ['all'],
              data: {
                  alert: 'Great news!',
                  eventId: event.id,
                  time: $scope.notificationInfo.time,
                  location: $scope.notificationInfo.location
                }
              }
            );
          },
          error: function(event, error) {
            console.log(error);
          }
        });

      };
    }]);