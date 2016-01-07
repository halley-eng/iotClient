/**
 * Created by Trullia on 2015/12/20.
 */


Meteor.methods({
    sensorValueInsert : function(url,svalue){


        var sensorValue = {
            sensor:url,
            value:Number(svalue),
            createdAt:new Date
        };
        var id = SensorValueCollection.insert(sensorValue);
        console.log('the id is'+id);
    },
    zig_light:function(status){

        //Meteor.sleep(1000);

        if(status){
            serialPort.write(":7364SDO0001");
        }else{
            serialPort.write(":7364SDO0000");
        }
        console.log("open the light  light !!!!!!!!!!!!!!!");
    },
    zig_fan:function(status){

        if(status){
            serialPort.write(":EB01SDO0001");

        }else{
            serialPort.write(":EB01SDO0000");


        }

    },
    sendEmail:function(){


        Email.send({
            to: 'llwoll@126.com',
            from: 'hailiangwin@gmail.com',
            subject: '有人闖入請注意！！！！！',
            text: '中華家居小組提醒您，你加有人闖入！！！'
        });
    }

});

