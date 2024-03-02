const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv').config()
const userRoutes = require("./routes/userRoutes")


const app = express();
app.use(express.json())




// rotues middleware
app.use('/api/user', userRoutes)

// connecting to the mongodb 
dbConnection = process.env.DB_CONNECTION
port = process.env.PORT
mongoose
  .connect(dbConnection)
  .then(() =>
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    })
  )
  .catch((error) => {
    console.log(error);
  });