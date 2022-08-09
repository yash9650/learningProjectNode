const express = require('express');
const app = express();
const path = require('path');
const data = require('./data.json');

app.use(express.static(path.join(__dirname,'public')));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))

app.listen(3000,()=> {
    console.log('Started......');
});

app.get('/',(req,res)=>{
    res.render('home');
});
app.get('/cats',(req,res)=>{
    const cats = ['pheobe','monica','rachael']
    res.render('cats', {cats});
});
app.get('/rand',(req,res)=>{
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('random',{rand : rand});
})

app.get('/r/:subreddit', (req,res)=>{
    const {subreddit} = req.params;
    const subredditData = data[subreddit];
    res.render('details', {...subredditData});
    
})
