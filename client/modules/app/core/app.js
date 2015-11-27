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
        })
        .state('authRedirect', {
            url: '/authRedirect?code',
            controller: ['$stateParams', '$state', function($stateParams, $state){
                console.log('code from log' + $stateParams.code);
                $state.go('app', {code: $stateParams.code});

                function callback(result){
                    console.log(result);
                }

                Meteor.call('asanaAuthCodeReceived', $stateParams.code, function(error, asanaUserId){
                    console.log('on asanaAuthCodeReceived: ' + asanaUserId);
                    Accounts.callLoginMethod({
                        methodArguments: [{
                            asanaUserId: asanaUserId
                        }],
                        userCallback: callback
                    });
                });
            }]
        });

    $urlRouterProvider.otherwise("/app");

    if (Meteor.userId()){
        console.log('Meteor.userId found on app startup: ' + Meteor.userId());

        Meteor.call('logInUsingMeteorUserId', function(error, result){
            console.log('result on logInUsingMeteorUserId: ' + result);
            if (!result){
                Meteor.logout();
            } else {

            }
        });
    }
});