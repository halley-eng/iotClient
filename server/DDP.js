/**
 * Created by Trullia on 2015/12/20.
 */



console.log("sensor acount" + SensorCollection.find({}).count());

remote.subscribe('sensor', function() {
    var items = SensorCollection.find();
    console.log(items.count());  // get 1
});