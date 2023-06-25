const express = require("express");
const cors = require("cors");
const path = require("path");
const movieModel = require("./model/movieDb");


const app = new express;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname,'/build')))
// view movies
   app.get('/api/viewmovie',async(req,res)=>{
    var data=await movieModel.find();
    res.json(data)
    })

// search movie
app.get('/api/search',(req,res)=>{
   
    const MovieName = req.query.MovieName;
    console.log("movie name",MovieName)
    const searchCriteria = {
        MovieName:MovieName
      };

      movieModel.find(searchCriteria)
    .then((response) => {
        console.log(response)
      res.json(response);
    })
    .catch((err) => {
      console.error('Error occurred while searching:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

    // add movie
    app.post('/api/addmovie',async (req,res)=>{
        console.log(req.body);
    var data =await new movieModel(req.body);
    data.save();
    res.send({status:"data saved"})
    })
    // delete movie
    app.delete("/api/deletemovie/:id",async(req,res)=>{
    console.log(req.params.id);
    let id= req.params.id
    await movieModel.findByIdAndDelete(id)
    res.json({status:"deleted"})
    })
    // edit movie
    app.put('/api/editmovie/:id', async(req,res)=>{
        let id =req.params.id;
        try{
            await movieModel.findByIdAndUpdate(id, req.body);
            res.send("Data updated successfully");
        }
        catch(err){
            res.status(500).send(err)
        }
    })

    app.get('/*', function(req, res) {
        res.sendFile(path.join(__dirname + '/build/index.html'))
       });

app.listen(3008,()=>{
    console.log("server is listen to 3008");

})