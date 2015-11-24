/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader', ['angular-meteor'])
    .directive('mainApp', function factory(){
        return {
            restrict: 'E',
            templateUrl : 'client/modules/app/core/app.html'
        }});