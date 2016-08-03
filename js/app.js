'use strict';
/* global angular, $ */

angular.module('contentApp', [])
    
    .controller('ContentDisplayController', ['$scope', 'contentFactory', function($scope, contentFactory){
        $scope.letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        $scope.quiz = {};
        $scope.loaded = false;
        contentFactory.getContent().success(function(data) {
            console.log(data);
            $scope.quiz = data;
            $scope.loaded = true;
        });
    }])
    
    .filter('sanitizeHTML', ['$sce', function($sce) {
        return function(htmlCode){
            return $sce.trustAsHtml(htmlCode);
        };
    }])
    
    .filter('sanitizeURL', ['$sce', function($sce) {
        return function(url){
            return $sce.trustAsResourceUrl(url);
        };
    }])
    
    .service('contentFactory', ['$http', function($http){
        this.getContent = function(){
            return $http.get('content.json');
        };
    }])    
;