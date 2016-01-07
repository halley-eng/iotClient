/**
 * Created by zysd on 16/1/6.
 */




Meteor.publish("messages",function(){
   return Message.find({});
});