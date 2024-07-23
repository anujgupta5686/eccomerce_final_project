const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const mailSender = require("../../utils/mailSender");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    // Check if user exists
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: `This email address ${email} does not exist in User Entry `,
      });
    }
    // Create token using crypto
    const token = crypto.randomBytes(20).toString("hex");
    // Update this token in the DB
    const updatedDetail = await userModel.findOneAndUpdate(
      { email: email },
      { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 },
      { new: true }
    );
    console.log("Reset Password Token Data::", updatedDetail);
    // Create a URL for sending this URL to the email address
    const url = `http://localhost:3000/update-password/${token}`;
    await mailSender(
      email,
      "Password Reset",
      `Your link for email verification is ${url}. Please click on this URL link to reset your password.`
    );
    res.json({
      success: true,
      message: "Reset Password Token sent to your email address",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in resetPasswordToken",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }
    const userData = await userModel.findOne({ resetPasswordToken: token });
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "Token is invalid",
      });
    }
    if (!(userData.resetPasswordExpires > Date.now())) {
      return res.status(400).json({
        success: false,
        message: "Token expired",
      });
    }
    // Hashing the password
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { new: true }
    );
    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong in resetPassword",
    });
  }
};
