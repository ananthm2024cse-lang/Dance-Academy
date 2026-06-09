const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: String,
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: String,
    role: { type: String, default: "user" },
    registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", UserSchema);