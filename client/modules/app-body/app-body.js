/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .directive('appBody', function (){

        function parseContent(textContent){
            var rows = textContent.split('\n');
            var headers = rows[0].split(',');
            console.log("Header: " + headers.toString());
        }

        function Task(name, description){
            this.name = name;
            this.description = description;
        }

        var controller = ['$scope', function($scope){

            $scope.workspaces = [];
            $scope.projects = [];

            $scope.selectedWorkspace = {};
            $scope.selectedProject = {};

            $scope.getWorkspaces = function(){
                console.log('getting workspaces');

                Meteor.call('asanaGetWorkspaces', function(error, result){
                    $scope.$apply(function(){
                        $scope.workspaces.push.apply($scope.workspaces, result);
                    });
                });
            };

            $scope.getProjects = function(){
                console.log('getting projects');

                Meteor.call('asanaGetProjects', $scope.selectedWorkspace.id, function(error, result){
                    $scope.$apply(function(){
                        $scope.projects.push.apply($scope.projects, result);
                    });
                });
            };

            $scope.selectWorkspace = function(workspace){
                $scope.selectedWorkspace = workspace;

                $scope.getProjects();
            };

            $scope.selectProject = function(project){
                $scope.selectedProject = project;
            };

            $scope.uploadProject = function(){
                Meteor.call('asanaUploadWorkspace', $scope.selectedWorkspace.id, $scope.selectedProject.id);
            };

            $scope.onFileSelected = function($fileContent){
                console.log($fileContent);

                parseContent($fileContent);
            }
        }];
        return {
            restrict: 'E',
            templateUrl : 'client/modules/app-body/app-body.ng.html',
            controller: controller
    }});

angular.module('asana-template-uploader').directive('onReadFile', function ($parse) {
    return {
        restrict: 'A',
        scope: false,
        link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

            element.on('change', function(onChangeEvent) {
                var reader = new FileReader();

                reader.onload = function(onLoadEvent) {
                    scope.$apply(function() {
                        fn(scope, {$fileContent:onLoadEvent.target.result});
                    });
                };

                reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
            });
        }
    };
});