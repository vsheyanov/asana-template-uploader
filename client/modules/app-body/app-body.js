/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .directive('appBody', function (){

        var controller = ['$scope', function($scope){

            $scope.data = [];

            $scope.getWorkspaces = function(){
                console.log('getting workspaces');

                Meteor.call('asanaGetWorkspaces', function(error, result){
                    $scope.$apply(function(){
                        $scope.data.push.apply($scope.data, result);
                    });
                });
            }
        }];
        return {
            restrict: 'E',
            templateUrl : 'client/modules/app-body/app-body.ng.html',
            controller: controller
    }});