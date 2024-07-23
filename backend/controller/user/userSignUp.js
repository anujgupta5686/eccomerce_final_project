const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userSignUpController(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      throw new Error("Please provide email, password, and name");
    }

    const user = await userModel.findOne({ email });
    if (user) {
      throw new Error("User already exists");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const saveUser = await userModel.create(payload);

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || "Failed to create user",
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
