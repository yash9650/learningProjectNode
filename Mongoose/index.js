const mongoose = require('mongoose');

// This will access the db or create one if needed
async function main() {
    await mongoose.connect('', {useNewUrlParser: true, useUnifiedTopology: true});
  }
  
  main().then(() => {
      console.log("Connected successfully");
  }).catch((err) => {
      console.log("Something Went Wrong!!!");
  });

//   making schema adding validater
  const movieSchema = new mongoose.Schema({
      title: String,
      rating: Number,
      isFav: {
          type: Boolean,
          default: false
      }
  })

//   model the schema (creates collection in the db with name movies)
  const Movies = mongoose.model('Movie',movieSchema);

//   instance of movies
  const phirherapheri = new Movies({title: "Hera Pheri", rating: 9.5});
//   phirherapheri.save();



//   Movies.insertMany([
//     { title: 'Amelie', isFav: false, rating: 7.8 },
//     { title: 'Alien', isFav: true, rating: 7.5 },
//     { title: 'The Iron Giant', isFav: true, rating: 8.5},
//     { title: 'Stand By Me', isFav: false, rating: 8.9 },
//     { title: 'Moonrise Kingdom', isFav: true, rating: 5.5 }
// ])
//     .then(data => {
//         console.log("IT WORKED!")
//         console.log(data);
//     })

// Movies.findOneAndUpdate(
//     {title: 'Amelie'},
//     {title: 'Tere Naam'},
//     {new: true}
// ).then((data)=>{
//     console.log(data);
// })


// instance method
movieSchema.methods.isFavtoggle = function () {
    // this.isFav = !this.isFav
    // return this.save();
    console.log("Helo");
}

// static method
movieSchema.static.greet = function(){
    console.log("Heyyyyyy plz work");
}
Movies.greet();

const findProduct = async () => {
    const foundMovie = await Movies.findOne({ name: 'Tere Naam' });
    console.log(foundMovie)
    // foundMovie.isFavtoggle();
    // console.log(foundProduct)
}

findProduct();