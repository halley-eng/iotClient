/**
 * Created by Trullia on 2015/12/19.
 */


Meteor.startup(function(){





});


var serialPort = new SerialPort.SerialPort('COM3', {
    baudrate: 9600,
    parser: SerialPort.parsers.readline('\n')
});

SerialPort.list(function (err,ports) {
    ports.forEach(function(port){
        console.log(port);
    });
});


if (!serialPort.isOpen()){
    serialPort.open(function(){
        console.log("open the port");
    });
}

serialPort.on('data', Meteor.bindEnvironment(function(data) {
    console.log('***************************************************');
    console.log(data);

    console.log('nodeid:'+data.substring(1,6)+'tongdao:'+data.substring(6,10)
        +'value::'+data.substring(11,15)+'value::'+data.substring(16,20)+'idNumber'+data.substring(21,24));
    console.log(data.length);
    console.log('***************************************************');
}));


serialPort.on('error', function (error) {
    console.log('some error happened') ;
    console.log(error);



    serialPort.close(function (result) {
        console.log('shutdown'+result);
    });
});


//var parsedData = JSON.parse(data);
//if (parsedData.messageType === 'pinChange') {
//    Lights.update({
//        pin: parsedData.pin
//    }, {
//        $set: {
//            state: parsedData.state
//        }
//    });
//} else if (parsedData.messageType === 'methodResponse') {
//    parsedData.created = new Date();
//    messagePub.added('messages', Random.id(), parsedData);
//}