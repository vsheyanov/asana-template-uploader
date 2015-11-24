/**
 * Created by Victor on 24.11.2015.
 */
Meteor.methods({
    'asanaGetWorkspaces' : function(){

        console.log('received request');

        var FutureClazz = Meteor.npmRequire('fibers/future');

        var future = new FutureClazz();

        asanaClient.workspaces.findAll().then(function(result){
            future.return(result.data);
        });

        return future.wait();
    },
    'asanaGetProjects' : function(workspaceId){
        var FutureClazz = Meteor.npmRequire('fibers/future');

        var future = new FutureClazz();

        asanaClient.projects.findByWorkspace(workspaceId).then(function(result){
            future.return(result.data);
        });

        return future.wait();
    },
    'asanaUploadWorkspace' : function(workspaceId, projectId){
        asanaClient.tasks.create({workspace: workspaceId, projects: [projectId], name: 'test 22:'});
    }
});