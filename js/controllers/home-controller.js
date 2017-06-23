'use strict';
var appModule = appModule || {};
appModule.controller('HomeController', function ($scope, ApiService) {
    ApiService.getLabels()
            .then(function (result) {
                $scope.labels = result;
            });
            
            $scope.getModels = function(id) {
                    ApiService.getModelByLabelId(id)
                        .then(function (result) {
                            $scope.models = result;
                        });
            }
            
            $scope.getDetails = function(labelId, modelId) {
                ApiService.getDetailsByModelId(labelId, modelId)
                        .then(function (result) {
                            console.log(result);
                            $scope.details = result;
                        });
            }
            
          
            
            
    });