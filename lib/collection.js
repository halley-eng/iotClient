/**
 * Created by Trullia on 2015/12/20.
 */

//Message = new Mongo.Collection('messages');
//
//
// //remote = DDP.connect('http://iot.boldboy.gq:3000/');
//remote = DDP.connect('http://54.65.178.238:8080/');
//SensorCollection = new Meteor.Collection('sensor',remote);
//
//SensorValueCollection = new Meteor.Collection('sensor_value',remote);
//
//


Message = new Mongo.Collection('messages');


//remote = DDP.connect('http://iot.boldboy.gq:3000/');
//remote = DDP.connect('http://54.65.178.238:3000/');
remote = DDP.connect('http://localhost:3000/');
SensorCollection = new Meteor.Collection('sensor',remote);
//
SensorValueCollection = new Meteor.Collection('sensor_value',remote);
ControlDevice  = new Mongo.Collection("control_device",remote);


CapricaHomeland = new Mongo.Collection('capricaHomeland');




remote.subscribe('ControlDevices', function() {
    var items = ControlDevice.find();
    console.log(items.count());  // get 1
});
remote.subscribe('SensorValueCollection', function() {
    var items = SensorValueCollection.find();
    console.log(items.count());  // get 1
});


ControlDevice.find().observe(function(result){
    console.log("chenge something");
    console.log(result);
});
ControlDevice.find().observeChanges({
    changed: function(id, fields){
        console.log("chenge");
        console.log(id);
        console.log(fields);

        var device = ControlDevice.findOne(id);
        console.log(device);

        Meteor.call("zig_light",device.status);
    },
    added: function(id, fields){
        console.log("added");
        console.log(id);
        console.log(fields);
    },
    movedBefore: function(id, before){
        console.log("movedBefore");
        console.log(id);
        console.log(before);
    }
});



remote.subscribe("ControlDevices");
//Meteor.subscribe('ControlDevices',remote);
ControlDevice.after.update(function (userId, doc, fieldNames, modifier, options) {
    console.log("update"+userId);
    //...
}, {fetchPrevious: false});

//remote.watch('control_device', function(changedDoc, message) {
//    console.log("The players collection changed. Here's what changed: ", changedDoc, message);
//
//    // Was it removed?
//    if (message === "removed") {
//        console.log("This document doesn't exist in our collection anymore :(");
//    }
//});



if(Meteor.isServer){

    ControlDevice.allow({
        insert:function(userId,nodeDoc){
            return true;
        },
        remove:function(userId,nodeDoc){
            return true;
        },
        update:function(userId,nodeDoc){
            return true;
        }
    });
    //SensorValueCollection.allow({
    //    insert:function(userId,nodeDoc){
    //        return true;
    //    },
    //    remove:function(userId,nodeDoc){
    //        return true;
    //    },
    //    update:function(userId,nodeDoc){
    //        return true;
    //    }
    //});

    SensorCollection.allow({
        insert:function(userId,nodeDoc){
            return true;
        },
        remove:function(userId,nodeDoc){
            return true;
        },
        update:function(userId,nodeDoc){
            return true;
        }
    });
    CapricaHomeland.allow({
        insert:function(userId,nodeDoc){
            return true;
        },
        remove:function(userId,nodeDoc){
            return true;
        },
        update:function(userId,nodeDoc){
            return true;
        }
    });

}


