const express = require("express");
const router = express.Router();

const { createBooking } = require("../Controller/BookingController");

router.post("/create", createBooking);

module.exports = router;