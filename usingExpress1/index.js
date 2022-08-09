const express = require('express');
const app = express();

app.listen(3005,()=> {
    console.log('Started......')
})

// work for all the http req such as get posy
// app.use((req,res)=>{
//     console.log('Yeah.....')
//     res.send('How You Doing....?');
// })

// Routing
app.get('/cats',(req,res)=>{
    res.send('<h1>Meow....</h1>');
})
// for route that doesnt exit we can add * and resposnd

// more about routing using : and req param

// app.get('/r/:something',(req, res)=>{
//     // const {something} = req.params;
//     const data = req.params.something;
//     res.send(`Hello ${data}`);
//     // console.log(req.params);
// })


// quey String
app.get('/r/search',(req, res)=>{
    const {q} = req.query;
    res.send(`Hello there ${q}`);
    // console.log(req.params);
})
