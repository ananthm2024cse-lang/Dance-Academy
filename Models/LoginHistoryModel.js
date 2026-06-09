const mongoose = require("mongoose");

const LoginHistorySchema = new mongoose.Schema({
    fullname: String,
    email: String,
    loginTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("LoginHistory", LoginHistorySchema);
