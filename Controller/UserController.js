const User=require("../Models/UserModel");
const LoginHistory = require("../Models/LoginHistoryModel");

const signupUser = async(req,res) => {
    try{
        const { fullname, email, password } = req.body;

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existing = await User.findOne({ email: email.toLowerCase().trim() });
        if (existing) {
            return res.status(400).json({ message: "Email already registered. Please login." });
        }

        const NewUser = new User({ fullname, email, password });
        const SavedUser = await NewUser.save();
        res.status(200).json({
            message: "User Registered successfully",
            data: SavedUser,
        });
    } catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Body:", req.body);

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    console.log("User:", user);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.password !== password) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Save to login history
    const history = new LoginHistory({
      fullname: user.fullname,
      email: user.email,
      loginTime: new Date()
    });
    await history.save();

    res.status(200).json({
      message: "Login successful",
      data: user,
      token: "mock-jwt-token-for-" + user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password");
    res.status(200).json({
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getLoginHistory = async (req, res) => {
  try {
    const history = await LoginHistory.find().sort({ loginTime: -1 });
    res.status(200).json({
      data: history
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
      message: "User updated successfully",
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


module.exports = {
    signupUser,
    loginUser,
    getAllUsers,
    getLoginHistory,
    updateUser,
    deleteUser
}