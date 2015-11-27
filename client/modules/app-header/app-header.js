/**
 * Created by Victor on 23.11.2015.
 */
angular.module('asana-template-uploader')
    .directive('appHeader', function (){
        return {
            restrict: 'E',
            controller: ['$scope', '$stateParams', '$meteor', function($scope, $stateParams, $meteor){

                $scope.user = Meteor.user();

                $scope.checkUser = function(){
                    console.log("Check: " + Meteor.userId());
                }

                $scope.login = function(){

                    serialize = function(obj) {
                        var str = [];
                        for(var p in obj)
                            if (obj.hasOwnProperty(p)) {
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                            }
                        return str.join("&");
                    }

                    var str = serialize({
                        client_id: "68157377549741",
                        redirect_uri: "http://localhost:3000/authRedirect",
                        response_type: "code",
                        state: "state"
                    });

                    window.location.href = "https://app.asana.com/-/oauth_authorize?"+str;

                    /*Meteor.call('getLoginUrl')
                        .then(function(result, error){

                        });*/
                };


            }],
            templateUrl : 'client/modules/app-header/app-header.html'
        }});