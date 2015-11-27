/**
 * Created by Victor on 24.11.2015.
 */
Meteor.methods({
    'asanaGetWorkspaces' : function(){
        if (!Meteor.user()){
            console.log("Not logged in!");
            return;
        }

        console.log('received request: ' + Meteor.userId());

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
    },
    'asanaAuthCodeReceived': function(authCode){
        console.log('method called: asanaAuthCodeReceived');
        var FutureClazz = Meteor.npmRequire('fibers/future');
        var future = new FutureClazz();

        createClient();

        console.log("auto code on server", authCode);
        asanaClient.app.accessTokenFromCode(authCode).then(Meteor.bindEnvironment(
            function(credentials) {
                console.log('sending: ' + credentials.data.id);
                future.return(credentials.data.id);

                loginService.saveAuthCredentials(credentials);
            }
        ));

        return future.wait();



        /*var accessAsyn = Meteor.wrapAsync(asanaClient.app.accessTokenFromCode, asanaClient.app);

        var credentials = accessAsyn(authCode);

        console.log('sending: ' + credentials.data.id);

        return credentials.data.id;*/
    },
    'logInUsingMeteorUserId': function(){
        console.log('trying to log in using meteor user id: ' + Meteor.userId());
        return loginService.logInUsingMeteorUserId();
    }
});

asanaClient = null;

function createClient() {

    var asana = Meteor.npmRequire('asana');

    asanaClient = asana.Client.create({
        clientId: Meteor.settings.clientId,
        clientSecret: Meteor.settings.clientSecret,
        redirectUri: 'http://localhost:3000/authRedirect'
    });
}