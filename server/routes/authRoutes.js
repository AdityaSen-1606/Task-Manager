const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUserName } = require("../controllers/authController");

router.post("/register", registerUser);

router.post("/login",loginUser);

router.get("/user", getUserName);
module.exports = router;
