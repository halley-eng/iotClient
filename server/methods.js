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
    sendEmail:function(){


        Email.send({
            to: 'llwoll@126.com',
            from: 'hailiangwin@gmail.com',
            subject: 'hello',
            text: 'tiantianxiangshang'
        });

    }
    //,
    //sendEmail: function (to, from, subject, text) {
        //check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        //this.unblock();
        //
        //
        //Meteor.Mailgun.send({
        //    to: to,
        //    from: from,
        //    subject: subject,
        //    text: text
        //    //,
        //    //html: mailFields.html
        //});

        //Email.send({
        //    to: to,
        //    from: from,
        //    subject: subject,
        //    text: text
        //});
    //}


});

