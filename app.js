const express = require('express') //import express
const app = express() // initialize express
const port = 3000 //setting deport

// using the get method
// Logic for the Get Request
// Trying to get and return data
app.get('/', (req, res) => {
  res.send("Hi")
});

app.use(express.json());

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const validUser = {
    email: 'briankim@gmail.com',
    password: '1234',
  }
  if (email == validUser.email && validUser.password) {
    res.send({
      status: 'valid'
    });
  } else {
    res.send(404, {
      status: "Not Found"
    })
  }
  console.log(req.body);
})

// starting the application
// listening to the port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})