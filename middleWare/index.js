const express = require('express');
const app = express();
const morgan = require('morgan');


app.use(morgan('tiny'));

app.use((req,res,next)=>{
    res.send('hey');
    // next will go to the next possible route or middleware is
    // can be use to access data and modify before it goes to route
    console.log('hi');
    return next();
})
app.listen(3000,(req,res)=>{
    console.log('Connected...')
})

app.get('/',(req,res)=>{
    // res.send('home');
    console.log('hi');
})

// in the end
app.use((req,res)=>{
    res.status(404).send('not found')
})