///**
// * Created by zysd on 15/12/27.
// */
//
//
Meteor.startup(



function () {

    Cylon.robot({
        name: 'IOT',
        description: 'Description is optional...',
        runStepper:false,

        connections: {
            arduino: { adaptor: 'firmata-llwoll', port: '/dev/cu.usbmodem1461' }
        },
        //,module: 'stepper'
        devices: {
            redLed: { driver: 'led', pin: 5 },
            yellowLed: { driver: 'led', pin: 13 },
            light: { driver: 'analog-sensor', pin: 2, lowerLimit: 100, upperLimit: 750 },
            stepper:{driver:'stepper',pin1:8,pin2:9,pin3:10,pin4:11}
        },

        redLed: function () {
            this.devices.redLed.toggle();
            return 'Cylon ' + this.name + ' toggles red led';
        },

        yellowLed: function () {
            this.devices.yellowLed.toggle();
            return 'Cylon ' + this.name + ' toggles yellow led';
        },

        toggleAll: function () {
            this.devices.redLed.toggle();
            this.devices.yellowLed.toggle();
            return 'Cylon ' + this.name + ' toggles red and yellow led';
        },
        startStepper: function() {

            console.log("open the door----------------");
            this.runStepper = true;

            for (var i = 0; i < 2; i++) {

                this.devices.stepper.setSpeed(3000);
                this.devices.stepper.step(1800);

            }


            return 'Cylon ' + this.name + "start the stepper";
        },
        closeStepper:function(){
           this.runStepper = false;
            return 'Cylon ' + this.name + "close the stepper";
        },
        commands: function () {
            return {
                //'Toggle red Led': this.redLed,
                'Toggle yellow Led': this.yellowLed,
                //'Toggle all': this.toggleAll,
                'startStepper': this.startStepper,
                'closeStepper': this.closeStepper
            };
        },
        work: Meteor.bindEnvironment( function (my) {
            var analogValue = 0;
            every((1).second(),Meteor.bindEnvironment(  function(){
                analogValue = my.light.analogRead();
                // bSYQL
                Meteor.call('sensorValueInsert','1fUYi',analogValue);

                console.log('Analog value =>',analogValue);
                //my.redLed.turn_on();
                my.devices.redLed.toggle();

                console.log("stepper");

            }), function( error) {console.log( error);} );



            my.light.on('lowerLimit', function(val) {
                console.log("Lower limit reached!");
                console.log('Analog value => ', val);
                my.devices.yellowLed.toggle();


            });

            my.light.on('upperLimit', function(val) {
                console.log("Upper limit reached!");
                console.log('Analog value => ', val);

                my.devices.yellowLed.toggle();

            });
        }, function( error) {console.log( error);})

    }).start();

}


);


sensorValueInsert = function(url,svalue){


    var sensorValue = {
        sensor:url,
        value:svalue,
        createdAt:new Date
    };
    var id = SensorValueCollection.insert(sensorValue);
    console.log('the id is'+id);
}