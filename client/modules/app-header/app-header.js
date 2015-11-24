/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .directive('appHeader', function factory(){
        return {
            restrict: 'E',
            templateUrl : 'client/modules/app-header/app-header.html'
        }});