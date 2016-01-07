/**
 * Created by Trullia on 2015/12/19.
 */



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

    /*
        气体与光照和风扇
     */
    if (message.nodeid == 'DF4C')
        if(message.tongdao == '1000'){
            //    ehCQ7  1fUYi
            var  v = parseFloat(message.value2)*100;
            Meteor.call('sensorValueInsert',"14Ir6", v);
            if(v>160){
                Meteor.call("zig_fan",false);
                //Meteor.call("zig_light",false);
            }else
            if(v>10)
            {
                //Meteor.call("zig_light",true);
                Meteor.call("zig_fan",true);
            }
        }





    /*
        光照与灯光的自动控制
     */
    if (message.nodeid == 'E428')
     if(message.tongdao == '1000'){
     //    ehCQ7  1fUYi
         var  v = parseFloat(message.value2)*100;
        //Meteor.call('sensorValueInsert',"IMVO8", v);
         if(v<60){
             Meteor.call("zig_light",false);
         }
         if(v>150)
         {
             Meteor.call("zig_light",true);
         }
     }

    if (message.nodeid == 'F59A')
        if(message.tongdao == '1000'){
            //    ehCQ7  1fUYi
            //较低的时候 表示有人 要发邮件报警
            var v = parseFloat(message.value2)*100;
            //Meteor.call('sensorValueInsert','vjIfO',v);
            //if (v<100){
            //    Meteor.call("sendEmail",'llwoll@126.com','hailiangwin@gmail.com',"hello,llwoll","现在有人闯入你的家里面哦");
            //}
        }

    //温度监测自动启动风扇
    if (message.nodeid == '9AF7')
        if(message.tongdao == '0010'){
            //    ehCQ7  1fUYi
            //较低的时候 表示有人 要发邮件报警
            var v = parseFloat(message.value2);
            //Meteor.call('sensorValueInsert','j_Jte',v);
            if (v>30){
                Meteor.call("zig_fan",true);
            }else{
                Meteor.call("zig_fan",false);
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