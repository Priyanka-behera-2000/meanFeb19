//Adder is imported
const Adder=require('./adder');

//An object of the Adder is created
var adder=new Adder();

//a callback is registered as listener of
//the added event
adder.on("added",()=>{

    console.log("added event is generated.");

});

//add() of the Adder is invoked
console.log("Invoking add()...");
var sum=adder.add(4,5);
console.log(`sum is ${sum}`);