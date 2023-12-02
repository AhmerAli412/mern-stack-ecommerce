const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate input data (you may want to add more validation)
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Please provide all required fields" });
  }

  // Encrypt password
  const encryptedPassword = CryptoJS.AES.encrypt(password, process.env.PASS_SEC).toString();

  // Create a new user
  const newUser = new User({
    username,
    email,
    password: encryptedPassword,
  });

  try {
    // Save the new user to the database
    const savedUser = await newUser.save();

    // Create a token for the registered user
    const token = jwt.sign(
      {
        id: savedUser._id,
        isAdmin: savedUser.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "45d" }
    );

    // Include the user ID and token in the response
    const responseData = {
      id: savedUser._id,
      username: savedUser.username,
      email: savedUser.email,
      // isAdmin:true,
      token,
    };

    res.status(201).json(responseData);
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


//LOGIN

router.post("/login",async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res.status(401).json({ message: "Wrong credentials!" });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "45d" }
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
