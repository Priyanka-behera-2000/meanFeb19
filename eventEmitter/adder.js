const EventEmitter =require('events');

//A subclass of EventEmiiter is defined
class Adder extends EventEmitter
{
//Method to generate the event are defined
add(x, y)
{
//emitting event
console.log("add() is invoked, triggering event...");
this.emit("added");
//business logic is defined
return parseInt(x)+parseInt(y);

}


}

//the class is exported
module.exports=Adder;