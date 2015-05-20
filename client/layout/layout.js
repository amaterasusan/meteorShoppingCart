Template.layout.helpers({
	username: function() {
    	return Meteor.user().username;
    },
	isAdmin: function() {
    	return Meteor.user() && Meteor.user().username == "admin";
    }
}) 
