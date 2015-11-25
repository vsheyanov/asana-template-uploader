/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .controller('AppBodyController', ['$scope', '$meteor', function($scope, $meteor){

        $scope.templates = $meteor.collection(Templates).subscribe('templates');

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

        $scope.getWorkspaces();
    }]);
