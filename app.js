const express = require('express') //import express
const app = express() // initialize express
const port = 3000 //setting deport
const mongoose = require('mongoose');
const { Schema } = mongoose; //Grab the schema object from mongoose
require('dotenv').config();

mongoose.connect('mongodb+srv://netflix-api-dev:u45UXljBRHflrr13@cluster0.dksk4.mongodb.net/netflix-api-db-dev?retryWrites=true&w=majority', {
  useCreateIndex: true, 
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const User = mongoose.model('Users', new Schema(
  { 
    name: String, 
    email: {
      type: String,
      required: true, 
      unique: true
    }, 
    password: {
      type: String, 
      required: true
    }, 

  }));


app.use(express.json());

// using the get method
// Logic for the Get Request
// Trying to get and return data
app.get('/', (req, res) => {
  res.send("Hi")
});

app.post('/register', (req, res) => {
  const newUser = new User({
    name: req.body.name, 
    email: req.body.email, 
    password: req.body.password
  })

  newUser.save((err, user)=>{
    if(err){
      console.log(err);
      res.send(400, {
        status: err
      })
    } else {
      console.log("All is good");
      console.log(user);
      res.send("resgister");
    }
  })
})

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({
    email: email,
    password: password
  }, (err, user) => {
    if(user) {
      res.send({
        status: "Valid"
    });
  }else{
      res.send(404, {
        status: "Not Found"
      
      })
    }
  });

})

// starting the application
// listening to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})