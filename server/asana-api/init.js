/**
 * Created by Victor on 24.11.2015.
 */

var asana = Meteor.npmRequire('asana');

asanaClient = asana.Client.create().useAccessToken(Meteor.settings.privateAccessToken);