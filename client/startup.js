/**
 * Created by zysd on 15/12/29.
 */


Meteor.startup(function () {
    Meteor.call('scanForToasters');

    sAlert.config({
        condition: 'blue',
        effect: 'jelly',
        position: 'right-bottom',
        timeout: 3000
    });
});

Meteor.subscribe('occupiedCapricaData');