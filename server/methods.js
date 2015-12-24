/**
 * Created by Trullia on 2015/12/20.
 */


Meteor.methods({
    sensorValueInsert : function(url,svalue){


        var sensorValue = {
            sensor:url,
            value:svalue,
            createdAt:new Date
        };
        var id = SensorValueCollection.insert(sensorValue);
        console.log('the id is'+id);
    }
});