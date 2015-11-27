/**
 * Created by Victor on 26.11.2015.
 */

loginService = (function(){

    Accounts.registerLoginHandler(function(loginRequest) {
        console.log('received registerLoginHandler: ' + loginRequest.asanaUserId);
        //there are multiple login handlers in meteor.
        //a login request go through all these handlers to find it's login hander
        //so in our login handler, we only consider login requests which has admin field
        if(!loginRequest.asanaUserId) {
            return undefined;
        }

        //our authentication logic :)
        if(loginRequest.asanaUserId == '') {
            return null;
        }

        //we create a admin user if not exists, and get the userId
        var userId = null;
        var user = asanaUsersMethods.getAsanaUserMyAsanaUserId(loginRequest.asanaUserId);

        if(user) {
            if (user.meteorUserId){
                userId = user.meteorUserId;
            } else {
                console.log('Creating new meteor user');

                userId = Meteor.users.insert({});

                asanaUsersMethods.updateMeteorIdForAsanaId(userId, loginRequest.asanaUserId);
            }
        } else {
            throw new Meteor.Error("Asana is not authorized!");
        }

        //send loggedin user's user id
        return {
            userId: userId
        }
    });

    function logInUsingMeteorUserId(){
        var asanaUser = asanaUsersMethods.getAsanaUserByMeteorUserId(Meteor.userId());

        if (asanaUser == undefined){
            console.log('asana user is not found by userId: ' + Meteor.userId());
            return false;
        }

        console.log('Asana user found by meteor user id');

        var credentials = {
            refresh_token: asanaUser.refresh_token
        };

        asanaClient.useOauth({
            credentials: credentials
        });

        return true;
    }

    function saveAuthCredentials(credentials){

        asanaClient.useOauth({ credentials: credentials.access_token });

        asanaUsersMethods.saveAuthCredentials(credentials);
    }

    return {
        logInUsingMeteorUserId: logInUsingMeteorUserId,
        saveAuthCredentials: saveAuthCredentials
    }
})();