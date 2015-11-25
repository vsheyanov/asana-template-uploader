/**
 * Created by Victor on 25.11.2015.
 */
Meteor.publish('templates', function(){
    return Templates.find({
        isPrivate : false
    })
});