const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  console.log("In Register Server")

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "User already exists",
      });
    }
    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        msg: "Invalid credentials",
      });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Get user name from token
exports.getUserName = async (req,res) => {
  const token = req.header("Authorization");

  if(!token){
    return res.status(401).json({msg:"Sign In Again, Token not found"});
  }

  try {
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    //extracting user
    const user= decode.user.id;

    //find the user by ID
    const userName = await User.findById(user);

    if(!userName){
      return res.status(404).json({msg:"User Name not found"});
    }

    return res.status(200).json(userName.name);

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
}
