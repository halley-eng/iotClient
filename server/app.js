/**
 * Created by Trullia on 2015/12/19.
 */


//
//Meteor.startup(function(){
//    Meteor.Mailgun.config({
//        username: 'llwoll@126.com',
//        password: '9579llwoll'
//    });
//});


//sensorValueInsert('5U7S0',Random.fraction()*20+50);

//for (var i = 1;i<5;i++){
////Meteor.sleep(500);
//var flag = Random.fraction()*100;
//if (flag<5){
//    sensorValueInsert('5U7S0',Random.fraction()*20+50);
//}
//}


serialPort = new SerialPort.SerialPort('/dev/cu.usbmodem1421', {
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

        //serialPort.write("SPL=0x0");
    });
}

serialPort.on('data', Meteor.bindEnvironment(function(data) {
    console.log('***************************************************');
    console.log(data);

    var message = {
        nodeid:data.substring(1,5),
        tongdao:data.substring(6,10),
        value1:data.substring(11,15),
        value2:data.substring(16,20),
        idNumber:data.substring(21,24)
    };

    //if (message.tongdao == '0100'){
        //Meteor.call('sensorValueInsert','DriTL',message.value2);
        //sensorValueInsert('DriTL',message.value2);
    //}

    if (message.nodeid == 'E428')
     if(message.tongdao == '1000'){
     //    ehCQ7  1fUYi
        //Meteor.call('sensorValueInsert','qIv5E', parseFloat(message.value2)*100);
     }

    if (message.nodeid == 'F59A')
        if(message.tongdao == '1000'){
            //    ehCQ7  1fUYi
            //较低的时候 表示有人 要发邮件报警
            var v = parseFloat(message.value2)*100;
            if (v<100){
                //Meteor.call("sendEmail",'llwoll@126.com','hailiangwin@gmail.com',"hello,llwoll","现在有人闯入你的家里面哦");

                //Meteor.call('sendEmail',{
                //    to: 'llwoll@126.com',
                //    from: 'hailiangwin@gmail.com',
                //    subject: 'I really like sending emails with Mailgun!',
                //    text: 'Mailgun is totally awesome for sending emails!',
                //    html: 'With meteor it&apos;s easy to set up <strong>HTML</strong> <span style="color:red">emails</span> too.'
                //});

            }

        }




    var message1 = 'nodeid:'+data.substring(1,5)+'   tongdao:'+data.substring(6,10)
        +'   value::'+data.substring(11,15)+'   value::'+data.substring(16,20)+'   idNumber  '+data.substring(21,24);
    console.log(message1);
    console.log(data.length);
    //Message.insert(message);
    console.log('***************************************************');

}));





serialPort.on('error', function (error) {
    console.log('some error happened') ;
    console.log(error);

    serialPort.close(function (result) {
        console.log('shutdown'+result);
    });
});



function sensorValueInsert(url,svalue){

    var sensorValue = {
        sensor:url,
        value:svalue,
        createdAt:new Date
    };
    //SensorValueCollection.insert(sensorValue);
};














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