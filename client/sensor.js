/**
 * Created by Trullia on 2015/12/20.
 */



Template.SensorMsg.helpers({
    messages:function(){
        return Message.find({},{
            sort:{
                created:-1,
                limit:10
            }
        });
    }
});


Template.postList.helpers({

    sensors:function(){
        return SensorCollection.find();
    }

});

Template.postList.events({

    'click #SensorValue':function(e,t){

                var random = Random.fraction()*200+500;
                var random1 =Math.round(random);
                Meteor.call('sensorValueInsert','DriTL',random1);

    }
});