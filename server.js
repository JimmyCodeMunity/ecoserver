const express = require('express');
const mongoose = require('mongoose')

require('dotenv').config();


const app = express();

const cors = require('cors');


app.use(cors())


//allow json requests to be sent to the server
app.use(express.json())

//allow url encoded for from input
app.use(express.urlencoded({ extended: false }))


if (process.env.NODE_ENV !== 'PRODUCTION') {
  require("dotenv").config({
    path: "./.env"
  })
}


const port = process.env.PORT;
const db = process.env.DB_URL;

app.listen(port, (req, res) => {
  console.log(`Server running on port ${port}`)
})

mongoose.connect(db, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.error('Failed to connect to MongoDB', err));


app.get('/', (req, res) => {
  res.send('Server started')
})
