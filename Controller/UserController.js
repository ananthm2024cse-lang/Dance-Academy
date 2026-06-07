const User=require("../Models/UserModel");

const signupUser = async(req,res) => {
    try{
        const { fullname,email,password } = req.body;
        const NewUser = new User({
            fullname,
            email,
            password,
        });
        const SavedUser = await NewUser.save();
        res.status(200).json({
            message:"User Registered successfully",
            data:SavedUser,
        });
    }

    catch(error){
        res.status(404).json({
            message:"Error Registering in User",
            error:error.message,
        });
    }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Body:", req.body);

const user = await User.findOne({ email });

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

    res.status(200).json({
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
    signupUser,
    loginUser,
}