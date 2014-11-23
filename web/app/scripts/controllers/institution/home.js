'use strict';

angular.module('rscwbApp')
  .controller('InstitutionHomeCtrl', ['$scope','joinTables',
    function ($scope, joinTables) {
      $scope.checkUser();
debugger
      $scope.bloodInternal = [];
      $scope.bloodNational = [];
      //var currentInst = joinTables.join($scope.currentUser.id).then(function(instititution) {
      joinTables.join("4AiydVM8JP").then(function(institution) {
        var values = [];
        var max = 0;
        for(var i = 0; i < institution.blood.length; i++) {
          var att = institution.blood[i];
          values.push(att.get('value'));
          if(parseInt(att.get('value')) > max) {
            max = parseInt(att.get('value'));
          }
          $scope.bloodInternal[i] = { value: att.get('value'), type: att.get('bloodType').slice(0, -1), super: att.get('bloodType').slice(-1) };
        }
        for(var i in values) {
          $scope.bloodInternal[i].height = values[i]/max*115;
        }
      }, function(error) {
        console.log(error);
      });

    }]);
