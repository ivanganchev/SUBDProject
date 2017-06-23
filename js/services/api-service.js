'use strict';
var appModule = appModule || {};
appModule.service('ApiService', ['$http', '$q',
    function ($http, $q) {
        var BASE_PATH = 'http://localhost:1234/';
        
        function getLabels() {
            return $http.get(BASE_PATH + 'labels')
                    .then(function(result) {
                        return result.data;
                     }, function(err) {
                         console.log(err);
                     })
        }
        
        function getModelByLabelId(id) {            
            return $http.get(BASE_PATH + 'label/model/' + id)
                    .then(function(result) {
                        return result.data;
                     }, function(err) {
                         console.log("test ")
                         console.log(err);
                     })
            
           
        }
        
        
        function getDetailsByModelId(labelId, modelId) {
            return $http.get(BASE_PATH + 'label/model/' + labelId + '/details/' + modelId)
                    .then(function(result) {
                        return result.data;
                     }, function(err) {
                        console.log(err);
                     })
        }
        
        function getDetailsByModelIdIphone(id) {
            return $q.when(getDetailsByModelIdIphone[id]);
        }
        
        function addPhone (phone){
            var config = {headers: {'Content-Type' : 'application/x-www-form-urlencoded'}};
            return $http.put(BASE_PATH + 'add', JSON.stringify(phone), config);
                
        }
       
        return {
            getLabels: getLabels,
            getModelByLabelId: getModelByLabelId,
            getDetailsByModelId: getDetailsByModelId,
            getDetailsByModelIdIphone: getDetailsByModelIdIphone,
            addPhone: addPhone,
            
        };
    }
]);
