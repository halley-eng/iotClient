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
    },
    scanForToasters: function () {
        if (_.isObject(Cylon)) {
            var toasters = Cylon.robots;
            var toastersMap = Object.keys(toasters).map(function(toaster) {
                return {
                    name: toasters[toaster].name,
                    description: toasters[toaster].description,
                    commands: Object.keys(toasters[toaster].commands)
                };
            });
            if (CapricaHomeland) {
                CapricaHomeland.remove({});
                toastersMap.forEach(function (toaster) {
                    CapricaHomeland.insert(toaster);
                });
            }
        }
    },
    toastersCommand: function (command, toasterName) {
        if (_.isObject(Cylon)) {
            //return Cylon.robots[toasterName].commands[command]();
        //    Cylon.robots[toasterName]   .call
            return Cylon.robots["IOT"].commands.startStepper();
        }
    }

});