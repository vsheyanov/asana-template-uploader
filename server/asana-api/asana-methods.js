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
    'asanaCreateTemplate' : function(templateName, templateDescription, isPrivate, data){
        Templates.insert({
            ownerId     : "victor",
            name        : templateName,
            description : templateDescription,
            isPrivate   : isPrivate,
            data        : data
        });
    },
    'asanaUploadWorkspace' : function(workspaceId, newProjectName, templateId){
        //TODO add templateLookup

        asanaClient.projects.create({workspace: workspaceId, name: newProjectName})
            .then(function(result, error){
                if (error){
                    throw new Meteor.Error('Cannot create project');
                }

                function createTasks(){
                    var task = data.pop();

                    asanaClient.tasks.create({
                        workspace: workspaceId,
                        projects: [result.id],
                        name: task.name,
                        notes: task.notes
                    }).then(function(result, error) {
                        if (data.length > 0)
                            createTasks();
                    })
                }

                createTasks();
            });
    }
});