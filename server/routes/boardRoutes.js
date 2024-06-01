const express = require("express");
const { createBoard, getBoards, updateBoard, deleteBoard } = require("../controllers/boardControllers");
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get("/", auth, getBoards);
router.post("/create",auth, createBoard);
router.put("/update/:id",auth, updateBoard);
router.delete("/delete/:id",auth, deleteBoard);


module.exports = router;
