const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.listen(5000, () => {
  console.log("Port is running on 5000");
}
);

const userroutes = require("./Routers/UserRouter");
const bookingRoutes = require("./Routers/BookingRouter");

app.use("/api/booking", bookingRoutes);
app.use("/api/user", userroutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => { console.log("Connection to mongo_db Successfull..."); })
  .catch((err) => { console.log("Connection to mongo_db FAILED. ", err); })