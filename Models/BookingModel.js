const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  student: String,
  className: String,
  date: String,
  status: {
    type: String,
    default: "Pending",
  },
});

module.exports = mongoose.model("Booking", BookingSchema);