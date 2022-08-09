const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const mongoose = require('mongoose');

const Product = require('./modes/product');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/firstApp', {useNewUrlParser: true, useUnifiedTopology: true});
  }
  
  main().then(() => {
      console.log("mongo Connected successfully");
  }).catch((err) => {
      console.log("mongo Something Went Wrong!!!");
  });

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(express.urlencoded({extended: true}))
// app.use(express.json()) for json data

// for patch an put and delete req
app.use(methodOverride('_method'))

app.listen(3000,(req,res)=>{
    console.log('Connected...')
})

app.get('/', async (req,res)=>{
    const category = req.query.q;
    // console.log(category);
    // better option just category?
    const products = category === undefined ? await Product.find({}) : await Product.find({category: category});
    // console.log(products);
    res.render('home',{products});
    // res.send('Hello')
})

app.post('/',async (req,res)=>{
    const newItem = req.body;
    const item = new Product({
        name: newItem.name,
        price: parseFloat(newItem.price),
        category: newItem.category
    });
    await item.save();
    res.redirect('/');
})

app.get('/:id', async (req,res)=>{
    const id  = req.params;
    const product = await Product.findById(id.id);
    res.render('details',{product});
    // res.send('Hello')
})

app.patch('/:id', async (req,res)=>{
    const id  = req.params;
    const newItem = req.body;
    const product = await Product.findOneAndUpdate({_id: id.id},{
        name: newItem.name,
        price: parseFloat(newItem.price),
        category: newItem.category
    },{runValidators: true});
    res.redirect(`/${product._id}`);
})


app.get('/:id/edit', async (req,res)=>{
    const id  = req.params;
    const product = await Product.findById(id.id); 
    res.render('edit',{product});
})
app.delete('/:id', async (req,res) => {
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/');
})