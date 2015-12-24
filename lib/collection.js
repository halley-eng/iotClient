/**
 * Created by Trullia on 2015/12/20.
 */

Message = new Mongo.Collection('messages');


 //remote = DDP.connect('http://iot.boldboy.gq:3000/');
remote = DDP.connect('http://54.65.178.238:3000/');
SensorCollection = new Meteor.Collection('sensor',remote);

SensorValueCollection = new Meteor.Collection('sensor_value',remote);







