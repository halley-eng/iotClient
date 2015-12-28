/**
 * Created by zysd on 15/12/27.
 */


Meteor.startup(function () {

    Cylon.robot({
        name: 'Number Six',
        description: 'Description is optional...',

        connections: {
            arduino: { adaptor: 'firmata', port: '/dev/cu.usbmodem1421' }
        },

        devices: {
            redLed: { driver: 'led', pin: 10 },
            yellowLed: { driver: 'led', pin: 12 },
            light: { driver: 'analog-sensor', pin: 2, lowerLimit: 100, upperLimit: 750 },
            stepper:{driver:'stepper',pin1:8,pin2:9,pin3:10,pin4:11,module: 'stepper'}
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

        commands: function () {
            return {
                'Toggle red Led': this.redLed,
                'Toggle yellow Led': this.yellowLed,
                'Toggle all': this.toggleAll
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

            every((1).microseconds(),function(){
                my.devices.stepper.setSpeed(1000);
                my.devices.stepper.step(100);
                //console.log("stepper");
            });

            my.light.on('lowerLimit', function(val) {
                console.log("Lower limit reached!");
                console.log('Analog value => ', val);
            });

            my.light.on('upperLimit', function(val) {
                console.log("Upper limit reached!");
                console.log('Analog value => ', val);
            });
        }

    }).start();

});