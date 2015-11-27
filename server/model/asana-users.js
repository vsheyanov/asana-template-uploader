/**
 * Created by Victor on 26.11.2015.
 */
AsanaUsers = new Mongo.Collection('asanausers');

asanaUsersMethods = (function(){

    function getAsanaUserByMeteorUserId(meteorUserId){
        console.log('getting user by meteorUserId:' + meteorUserId);

        return AsanaUsers.findOne({
            meteorUserId: meteorUserId
        });
    }

    function getAsanaUserMyAsanaUserId(asanaUserId){
        return AsanaUsers.findOne({
            asanaUserId: asanaUserId
        });
    }

    function updateMeteorIdForAsanaId(meteorUserId, asanaUserId){
        var asanaUser = getAsanaUserMyAsanaUserId(asanaUserId);

        if (!asanaUser)
            return;

        AsanaUsers.update(asanaUser, {
            $set: {
                meteorUserId: meteorUserId
            }
        });
    }

    function saveAuthCredentials(credentials){
        console.log('saving asana credentials1: ' + credentials);

        var user = getAsanaUserMyAsanaUserId(credentials.data.id);

        if (user){
            AsanaUsers.update(user, createCredentialsObject(credentials));
        } else {
            AsanaUsers.insert(createCredentialsObject(credentials));
        }


        //access_token;
        //expires_in: 3600
        //token_type: 'bearer'
        /*data:
         { id: 46822230048972,
         name: 'Виктор Шеянов',
         email: 'victor.sheyanov@gmail.com' },
         refresh_token: '0/293203f817923897c547beba334ee205'*/


    }

    function createCredentialsObject(credentials){
        return {
            asanaUserId: credentials.data.id,
            access_token: credentials.access_token,
            token_type: credentials.token_type,
            refresh_token: credentials.refresh_token
        }
    }

    return {
        updateMeteorIdForAsanaId: updateMeteorIdForAsanaId,
        getAsanaUserByMeteorUserId: getAsanaUserByMeteorUserId,
        getAsanaUserMyAsanaUserId: getAsanaUserMyAsanaUserId,
        saveAuthCredentials: saveAuthCredentials
    }
})();