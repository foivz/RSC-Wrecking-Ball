'use strict';

angular.module('rscwbApp')
  .controller('InstitutionHomeCtrl', ['$scope','joinTables',
    function ($scope, joinTables) {
      $scope.blood = [];
      //var currentInst = joinTables.join($scope.currentUser.id).then(function(instititution) {
      var currentInst = joinTables.join("4AiydVM8JP").then(function(instititution) {
        //console.log(instititution);
        for(var i = 0; i < instititution.blood.length; i++) {
          var att = instititution.blood[i].attributes;
          $scope.blood[i] = { value: att.value, type: att.bloodType };
        }
      }, function(error) {
        console.log(error);
      })

    }]);
