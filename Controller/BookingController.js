const Booking = require("../Models/BookingModel");

const createBooking = async (req, res) => {
  try {
    const { student, className, date } = req.body;

    const booking = new Booking({
      student,
      className,
      date,
    });

    const savedBooking = await booking.save();

    res.status(201).json({
      message: "Booking Created Successfully",
      data: savedBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
};