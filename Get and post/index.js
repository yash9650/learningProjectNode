const express = require('express');
const app = express();
const path = require('path');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override')

let data = [
    {   
        id: uuid(),
        username: 'Akashay kumar',
        comment: 'uff... kya maal h yaar' 
    },
    {   
        id: uuid(),
        username: 'Hindustani Bhau',
        comment: 'Chal nikal l####' 
    },
    {   
        id: uuid(),
        username: 'Joey',
        comment: "How yaa Doin'..." 
    },
]

// use static file 
// app.use(express.static(path.join(__dirname,'public')));

app.use(express.urlencoded({extended: true}))
// app.use(express.json()) for json data

// for patch an put and delete req
app.use(methodOverride('_method'))

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))



app.listen(3000,()=> {
    console.log('Started......');
});

app.get('/',(req,res)=>{
    res.render('home');
});

app.post('/tacos',(req,res)=>{
    res.send(req.body);
})
app.get('/comments',(req, res)=>{
    res.render('comments', {data});
})
app.post('/comments',(req, res)=>{
    const newData = req.body;
    data.push({id: uuid(), username: newData.username, comment: newData.comment});
    res.redirect('/comments');
})

app.get('/comments/:id', (req,res)=>{
    // {id} this will represent the id
    const uid = req.params;
    const showComment = data.find(c => c.id === uid.id)
    res.render('ShowComment', { showComment });
})

app.get(`/comments/:id/edit`,(req, res)=>{
    const {id} = req.params;
    const editComment = data.find(c => c.id === id)
    res.render('edit',{editComment});
})

app.patch('/comment/:id',(req,res)=>{
    const editted = req.body;
    const {id} = req.params;
    const editComment = data.find(c => c.id === id);
    editComment.comment = editted.comment;
    res.redirect('/comments');
})

app.delete('/comment/:id',(req,res)=>{
    const {id} = req.params;
    data = data.filter(e => e.id != id);
    res.redirect('/comments');
})