const mongoose = require('mongoose');

const Product = require('./modes/product');

async function main() {
    await mongoose.connect('mongodb://localhost:27017/firstApp', { useNewUrlParser: true, useUnifiedTopology: true });
}

main().then(() => {
    console.log("mongo Connected successfully");
}).catch((err) => {
    console.log("mongo Something Went Wrong!!!");
});

// const p = new Product({name: 'Apples', price: 1.99, category: 'fruit'})

// p.save().then((data)=>{
//     console.log(data)
// }).catch(err => console.log(err));

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

Product.insertMany(seedProducts)
.then(data => console.log(data))
.catch(err => console.log(err))