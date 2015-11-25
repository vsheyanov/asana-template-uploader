/**
 * Created by Victor on 25.11.2015.
 */

angular.module('asana-template-uploader')
    .controller('ViewTemplateController', ['$scope', '$stateParams' , '$meteor', function($scope, $stateParams, $meteor){
        console.log('view: ' + $stateParams.templateId);

        $scope.template = $meteor.object(Templates, $stateParams.templateId).subscribe('templates');
    }]);
