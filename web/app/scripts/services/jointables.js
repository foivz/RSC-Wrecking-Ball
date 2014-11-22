'use strict';
/* global Parse */

angular.module('rscwbApp')
  .service('joinTables', ['$q', function ($q) {
    var join = function(objectId) {
      var User = Parse.Object.extend('User');
      var Institution = Parse.Object.extend('InstitutionData');
      var Blood = Parse.Object.extend('InstitutionBlood');

      var queryUser = new Parse.Query(User);
      var queryInstitution = new Parse.Query(Institution);
      var queryBlood = new Parse.Query(Blood);

      var fullInstitution = {};

      var returnResult = $q.defer();

      queryUser.get(objectId, {
        success: function(user) {
          fullInstitution.user = user;

          queryInstitution.equalTo('userObjectId', objectId);
          queryInstitution.find({
            success: function(institution) {
              fullInstitution.institution = institution[0];

              queryBlood.equalTo('userObjectId', objectId);
              queryBlood.find({
                success: function(blood) {
                  fullInstitution.blood = blood;
                  returnResult.resolve(fullInstitution);
                },
                error: function(result, error) {
                  console.log(error);
                  returnResult.reject(error);
                }
              });
            },
            error: function(result, error) {
              console.log(error);
              returnResult.reject(error);
            }
          });
        },
        error: function(result, error) {
          console.log(error);
          returnResult.reject(error);
        }
      });
      return returnResult.promise;
    };
    return {
      join: join
    };

  }]);
