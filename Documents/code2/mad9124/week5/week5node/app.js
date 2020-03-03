const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/test", {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

db.on("error", err => console.error(err));
db.once("open", function(){
    console.log("DB is open and we connected.");
    const beerSchema = new mongoose.Schema({name: String});
    const Beer = mongoose.model("Beer", beerSchema);

   Beer.find( {name: 'Corona'})
   .then( matches =>{
       console.log( matches[0]._id);

   })
   .catch(console.log);
    // let corona = new Beer({name: "Corona"});
    // let heineken = new Beer({name: "Heineken"});

    // corona.save()
    // .then(saveedBeer => console.log(`${saveedBeer.name} was saved.`) )
    // .catch(err => console.log(err) );

});