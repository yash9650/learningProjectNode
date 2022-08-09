const express = require('express');
const app = express();


// method-override for PUT,PATCH,DELETE req
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// DataBase Connection
const mongoose = require('mongoose');
async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useUnifiedTopology: true });
}

main().then(() => {
    console.log("mongo Connected successfully");
}).catch((err) => {
    console.log("mongo Something Went Wrong!!!");
});

// Path to run the file from any directory
const path = require('path');
const ejsMate = require('ejs-mate');
const Campground = require('./models/campground');

// views for ejs files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs',ejsMate);

// for url encoding the body
app.use(express.urlencoded({extended: true}))


// -------------------------------  ROUTES ----------------------------------->
app.listen(3000,(req,res)=>{
    console.log('Connected...')
})

app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/campgrounds',async (req,res)=>{
    const campgrounds = await Campground.find({})
    // console.log(campgrounds);
    // res.send('hello');
    res.render('campgrounds/index',{campgrounds});
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`/campgrounds/${campground._id}`)
})

app.get('/campgrounds/:id', async (req, res,) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', { campground });
});

app.get('/campgrounds/:id/edit', async (req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', { campground });
})

app.put('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    res.redirect(`/campgrounds/${campground._id}`)
});

app.delete('/campgrounds/:id', async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})