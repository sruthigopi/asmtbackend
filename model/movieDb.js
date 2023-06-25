const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://sruthigkani:sruthi@cluster0.v3fy1hn.mongodb.net/moviedb?retryWrites=true&w=majority")
.then(()=>{
    console.log("db connected")
})
.catch(err=>{console.log(err)});
let Schema =mongoose.Schema;

const movieSche = new Schema({
    MovieName:String,
    Actor:String,
    Actress:String,
    Director:String,
    ReleasedYear:Number,
    Camera:String,
    Producer:String,
    Language:String
});
var movieModel =mongoose.model("movie",movieSche);
module.exports =movieModel;