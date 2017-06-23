'use strict';
var appModule = appModule || {};
appModule.controller('AddController', function ($scope, ApiService) {
      $scope.phone = {};
      
      ApiService.getLabels()
              .then(function (labels){
                 $scope.labels = labels; 
              });
    
      $scope.add = function () {
             ApiService.addPhone($scope.phone);
      };
    });



