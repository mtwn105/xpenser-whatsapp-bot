const mongoose = require("mongoose");
require("dotenv").config();

function connectDB() {
  console.log("Connecting to Database");
  mongoose.connect(`${process.env.DB_URL}`)
    .then(() => {
      console.log("Connected to Database");
    })
    .catch((error: Error) => {
      console.log("Connection to Database failed", error);

    });
}

mongoose.connection.on('disconnected', () => {
  console.error('MongoDB disconnected. Attempting to reconnect...');
  connectDB();
});

module.exports = connectDB;
