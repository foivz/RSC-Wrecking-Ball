'use strict';

angular.module('rscwbApp')
  .controller('InstitutionInfoCtrl', ['$scope','joinTables',
    function ($scope, joinTables) {
      $scope.blood = [];
      $scope.instititution = {};

      //joinTables.join($scope.currentUser.id).then(function(instititution) {
      joinTables.join("4AiydVM8JP").then(function(institution) {
        var values = [];
        var max = 0;

        console.log

        $scope.institution = {
          name: institution.institution.get('name'),
          location: institution.institution.get('city'),
          //description: institution.institution.get('name');
        }

        for(var i = 0; i < institution.blood.length; i++) {
          var att = institution.blood[i];

          values.push(att.get('value'))
          if(parseInt(att.get('value')) > max) {
            max = parseInt(att.get('value'));
          }

          $scope.blood[i] = { value: parseInt(att.get('value')), type: att.get('bloodType').slice(0, -1), super: att.get('bloodType').slice(-1) };
        }

        for(var i in values) {
          $scope.blood[i].height = values[i]/max*100;
        }
      }, function(error) {
        console.log(error);
      });

      $scope.updateBloodValues = function() {
        joinTables.join("4AiydVM8JP").then(function(institution) {
          for(var i = 0; i < institution.blood.length; i++) {
            instititution.blood[i].save({
              value: $scope.blood[i].value + ''
            }, {
              succes: function(result) {
                console.log("updated blood values", result)
              },
              error: function(result, error) {
                console.log(error);
              }
            })
          }
        });
      }
  }]);
