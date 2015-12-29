///**
// * Created by zysd on 15/12/27.
// */
//
//
Meteor.startup(function () {

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
            yellowLed: { driver: 'led', pin: 12 },
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
        startStepper:function(){

            console.log("open the door----------------");
            this.runStepper = true;

            this.devices.stepper.setSpeed(3000);
            this.devices.stepper.step(2000);

            //every((1).microseconds(),function(){
            //
            //    if(!this.runStepper) return  "start the stepper failture";;
            //    this.devices.stepper.setSpeed(4000);
            //    this.devices.stepper.step(5);
            //    //console.log("stepper");
            //    console.log("one microseconds");
            //});
            return 'Cylon ' + this.name + "start the stepper";
        },
        closeStepper:function(){
           this.runStepper = false;
            return 'Cylon ' + this.name + "close the stepper";
        },
        commands: function () {
            return {
                //'Toggle red Led': this.redLed,
                //'Toggle yellow Led': this.yellowLed,
                //'Toggle all': this.toggleAll,
                'startStepper': this.startStepper,
                'closeStepper': this.closeStepper
            };
        },
        work: function (my) {
            var analogValue = 0;
            every((1).second(),function(){
                analogValue = my.light.analogRead();
                console.log('Analog value =>',analogValue);
                //my.redLed.turn_on();
                my.devices.redLed.toggle();

                //my.devices.stepper.setSpeed(110);
                //my.devices.stepper.step(100);
                //
                console.log("stepper");

            });

            //my.devices.stepper.on();
            //this.startStepper();

            every((1).microseconds(),function(){

                if(!this.runStepper) return;
                my.devices.stepper.setSpeed(4000);
                my.devices.stepper.step(5);
                //console.log("stepper");
                console.log("one microseconds");
            });

            my.light.on('lowerLimit', function(val) {
                console.log("Lower limit reached!");
                console.log('Analog value => ', val);

                my.devices.stepper.setSpeed(4000);
                my.devices.stepper.step(-2000);
            });

            my.light.on('upperLimit', function(val) {
                console.log("Upper limit reached!");
                console.log('Analog value => ', val);

                my.devices.stepper.setSpeed(4000);
                my.devices.stepper.step(2000);
            });
        }

    }).start();

});