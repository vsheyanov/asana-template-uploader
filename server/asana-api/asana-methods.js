/**
 * Created by Victor on 24.11.2015.
 */
Meteor.methods({
    'asanaGetWorkspaces' : function(){

        console.log('received request');

        var FutureClazz = Meteor.npmRequire('fibers/future');

        var future = new FutureClazz();

        asanaClient.workspaces.findAll().then(function(result){
            console.log(result.data);
            future.return(result.data);
        });

        return future.wait();
    }
});