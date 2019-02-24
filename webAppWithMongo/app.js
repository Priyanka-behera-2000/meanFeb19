const express = require('express');
const path=require('path');

//body parser middleware is imported
var bodyParser = require('body-parser');
//mongoose is imported
const mongoose=require('mongoose');

const app = express();

//mongooge is connected to the database
//connection is created
mongoose.connect('mongodb://localhost:27017/ducat');

//For each document which is to be fetched or persisted through
//Mongoose, a Model object is created.
const Product = mongoose.model('Product', 
{ 
 name: String, 
 brand: String,
 price: Number
});



//static middle ware is registered to server static conents from public folder
app.use(express.static('public'));
// middleware to process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//setting the template engine to be ejs
app.set('view engine','ejs');
//location of the ejs templates is set.
app.set('views',path.join(__dirname,'views')); 



app.get('/',(req,res)=>{

    res.render('index');
})


app.post('/save',(req,res)=>{

    console.log('Following product will be saved: ',req.body);
    let product=new Product(req.body);
    product.save().then(()=>{
        res.render('saved',{'product':req.body});
		});
   
})


app.post('/update',(req,res)=>{

    console.log('Following product will be updated: ',req.body);
   
    Product.update({_id : mongoose.Types.ObjectId(req.body._id)},
    {$set:{name:req.body.name,brand:req.body.brand,price:req.body.price}}).then(()=>{
      console.log('successfully updated, redirecting to products...');
      res.redirect('/products');    
	});
   
})

app.get('/products',(req,res)=>{

    //all the products are fetched from the db
    Product.find().then((products)=>{
        res.render('products',{'products':products});
    });
   
})

app.get('/delete',(req,res)=>{
   let id=req.query['id'];
    console.log('Product having following id will be deleted '+id);
    let objId=mongoose.Types.ObjectId(id);
    Product.remove({_id : objId}).then(()=>{
        console.log('successfully removed, getting the remaining products loaded...');
        res.redirect('/products');
    });
})

app.get('/edit',(req,res)=>{
    let id=req.query['id'];
     console.log('Product having following id will be loaded for editing '+id);
     Product.findById(id).then((product)=>{
         res.render('editPage',{'product':product});
     });
 })


app.listen(8080,()=>{
    console.log('Server is ready on port 8080.');
});