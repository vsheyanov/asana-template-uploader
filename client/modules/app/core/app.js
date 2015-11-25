/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader', ['angular-meteor', 'ui.router'])
    .directive('mainApp', function factory(){
        return {
            restrict: 'E',
            templateUrl : 'client/modules/app/core/app.html'
        }});

angular.module('asana-template-uploader').config(function($urlRouterProvider, $stateProvider, $locationProvider){
    $locationProvider.html5Mode(true);

    $stateProvider
        .state('app', {
            url: '/app',
            templateUrl: 'client/modules/app-body/app-body.ng.html',
            controller: 'AppBodyController'
        })
        .state('newTemplate', {
            url: '/new',
            templateUrl: 'client/modules/new-template/new-template.ng.html',
            controller: 'NewTemplateController'
        })
        .state('viewTemplate', {
            url: '/template/:templateId',
            templateUrl: 'client/modules/view-template/view-template.ng.html',
            controller: 'ViewTemplateController'
        });

    $urlRouterProvider.otherwise("/app");
});