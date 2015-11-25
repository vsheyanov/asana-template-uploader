/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .controller('AppBodyController', ['$scope', function($scope){

        function parseContent(textContent){
            var json = Papa.parse(textContent);


            var nameIndex  = json.data[0].indexOf("Name");
            var notesIndex  = json.data[0].indexOf("Notes");

            var tasks = [];

            for (var i = 1; i < json.data.length; i++){
                tasks.push(new Task(json.data[i][nameIndex], json.data[i][notesIndex]));
            }
            return tasks;
        }

        function Task(name, notes){
            this.name = name;
            this.notes = notes;
        }

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
            Meteor.call('asanaUploadWorkspace',
                $scope.selectedWorkspace.id,
                $scope.newProjectName,
                $scope.selectedTasks);
        };

        $scope.onFileSelected = function($fileContent){
            console.log($fileContent);

            $scope.selectedTasks = parseContent($fileContent);
        }

        $scope.getWorkspaces();
    }])





    /*
    .directive('appBody', function (){



        var controller =
        return {
            restrict: 'E',
            templateUrl : 'client/modules/app-body/app-body.ng.html',
            controller: controller,
            compile: function(){
                return {
                    post: function($scope){
                        $scope.getWorkspaces();
                    }
                }
            }
    }});
*/
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