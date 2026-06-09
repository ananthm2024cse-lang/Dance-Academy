const express = require("express");
const router = express.Router();

const { createBooking, getAllBookings, updateBooking, deleteBooking } = require("../Controller/BookingController");

router.post("/create", createBooking);
router.get("/all", getAllBookings);
router.put("/:id", updateBooking);
router.delete("/:id", deleteBooking);

module.exports = router;