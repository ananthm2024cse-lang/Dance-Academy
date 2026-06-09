const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const userroutes = require("./Routers/UserRouter");
const bookingRoutes = require("./Routers/BookingRouter");
const User = require("./Models/UserModel");

app.use("/api/booking", bookingRoutes);
app.use("/api/user", userroutes);

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: "suryasekar626@gmail.com" });
    if (!adminExists) {
      const admin = new User({
        fullname: "Surya Sekar",
        email: "suryasekar626@gmail.com",
        password: "surya@123",
        role: "admin"
      });
      await admin.save();
      console.log("Default admin user seeded successfully.");
    }
  } catch (error) {
    console.error("Error seeding default admin:", error);
  }
};

const connectDB = async () => {
  const dbUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/dance-academy";
  try {
    await mongoose.connect(dbUrl);
    console.log("Connection to mongo_db successful...");
    await seedAdmin();
    return true;
  } catch (err) {
    console.log(`Connection to mongo_db FAILED: ${err.message}`);
    return false;
  }
};

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  const connected = await connectDB();
  if (!connected) {
    console.error("MongoDB connection failed. Please check your MONGO_URL in .env");
    process.exit(1);
  }
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();