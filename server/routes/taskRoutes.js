const express = require("express")
const router = express.Router()
const auth = require("../middleware/authMiddleware");
const { getTask, createTask, updateTask, deleteTask } = require("../controllers/taskController");


router.get("/:id",auth, getTask);
router.post("/create", auth, createTask);
router.put("/update/:id", auth, updateTask);
router.delete("/delete/:id", auth, deleteTask);

module.exports = router;
