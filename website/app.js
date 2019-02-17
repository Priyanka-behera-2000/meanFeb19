const express = require('express');
const path=require('path');

//body parser middleware is imported
var bodyParser = require('body-parser');

const app = express();

//static middle ware is registered to server static conents from public folder
app.use(express.static('public'));
// middleware to process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//setting the template engine to be ejs
app.set('view engine','ejs');
//location of the ejs templates is set.
app.set('views',path.join(__dirname,'views')); 

//array to store products
const products=Array();


app.get('/',(req,res)=>{

    res.render('index');
})


app.post('/save',(req,res)=>{

    console.log('Following product will be saved: ',req.body);
    products.push(req.body);
    res.render('saved',{'product':req.body});
})

app.get('/products',(req,res)=>{

    res.render('products',{'products':products});
})

app.listen(8080,()=>{
    console.log('Server is ready on port 8080.');
});