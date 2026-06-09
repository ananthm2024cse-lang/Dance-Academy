const Booking = require("../Models/BookingModel");

const createBooking = async (req, res) => {
  try {
    const { student, email, className, date } = req.body;

    const booking = new Booking({
      student,
      email,
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

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({});
    res.status(200).json({
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Booking.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "Booking updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.status(200).json({
      message: "Booking deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBooking,
  getAllBookings,
  updateBooking,
  deleteBooking
};