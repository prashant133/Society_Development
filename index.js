const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

// environment varibales
dbConnection = process.env.DB_CONNECTION;
port = process.env.PORT;
sessionSecret = process.env.SECRET;

// to store the session in the database
const store = new MongoDBSession({
  uri: dbConnection,
  collection: "mySessions",
});

// session middleware
// session middleware
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60000, // Set maxAge to 1 minute (60000 milliseconds) for non-admin users
    },
    store: store,
  })
);

// rotues middleware
app.use("/api/user/", userRoutes);

// connecting to the mongodb
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
