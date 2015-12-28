'use strict';



if (Meteor.isServer) {

    CapricaHomeland.allow({
        insert: function() {
            return false;
        },
        update: function() {
            return false;
        },
        remove: function() {
            return false;
        }
    });
}