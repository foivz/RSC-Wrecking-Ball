'use strict';

angular.module('rscwbApp')
  .controller('InstitutionInfoCtrl', ['$scope','joinTables',
    function ($scope, joinTables) {
      $scope.blood = [];
      //var currentInst = joinTables.join($scope.currentUser.id).then(function(instititution) {
      var currentInst = joinTables.join("4AiydVM8JP").then(function(instititution) {
        var values = [];
        var max = 0;
        for(var i = 0; i < instititution.blood.length; i++) {
          var att = instititution.blood[i];
          values.push(att.get('value'))
          if(parseInt(att.get('value')) > max) {
            max = parseInt(att.get('value'));
          }
          $scope.blood[i] = { value: att.get('value'), type: att.get('bloodType').slice(0, -1), super: att.get('bloodType').slice(-1) };
        }
        for(var i in values) {
          $scope.blood[i].height = values[i]/max*100;
        }
      }, function(error) {
        console.log(error);
      })
  }]);
