//dependencies are imported
const express=require('express');
const bodyParser=require('body-parser');
//cors middleware is imported
const cors=require('cors');
//mongoose is imported
const mongoose=require('mongoose');
//app object is created
const app = express();
//mongoose is connected to the database
mongoose.connect('mongodb://localhost:27017/ducat');
//middle wares are registered
app.use(bodyParser.json());

//Model object is created for the document
const Emp = mongoose.model('Emp', 
{ 
 name: String, 
 job: String,
 salary: Number
 });

//cors middleware is registered with the app
app.use(cors());
//request processing callbacks
app.post('/emps',(req, res)=>{
    
   console.log('Following Emp will be saved: ',req.body);
   let emp=new Emp(req.body);
   emp.save().then(()=>{
    res.json({'status':'successfully saved.'});
   });
   
});

app.put('/emps',(req, res)=>{
    
    console.log('Following Emp will be updated: ',req.body);
    Emp.updateOne({_id:mongoose.Types.ObjectId(req.body._id)},
    {$set:{name:req.body.name,job:req.body.job,salary:req.body.salary}})
    .then(()=>{
    res.sendStatus(200);
    });
    
 });

app.get('/emps',(req, res)=>{
    console.log('Loading all employees...');
  
    Emp.find().then((emps)=>{
        res.json(emps);
    });   
});

app.get('/emps/:id',(req, res)=>{
    let id=req.params.id;
    console.log('Loading all employees using id: ',id);
  
    Emp.findById(id).then((emp)=>{
        res.json(emp);
    }); 
});

app.delete('/emps/:id',(req, res)=>{
    let id=req.params.id;
    console.log('deleting employees using id: ',id);
  
    Emp.deleteOne({_id:mongoose.Types.ObjectId(id)}).then(()=>{
        res.sendStatus(200);
    }); 
});
//app is asked to listen on the given port.
app.listen(8080,()=>{
    console.log('app is ready on 8080...');
});
