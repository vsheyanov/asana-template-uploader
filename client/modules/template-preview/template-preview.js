/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .directive('templatePreview', function (){
        return {
            restrict: 'E',
            controller: ['$scope', '$meteor', function($scope, $meteor){

            }],
            scope: {
                tasks: '='
            },
            templateUrl : 'client/modules/template-preview/template-preview.ng.html'
        }});