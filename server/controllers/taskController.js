const Task = require("../models/Task");
const Board = require("../models/Boards");
const Boards = require("../models/Boards");

//Create new task
exports.createTask = async (req, res) => {
  const { title, description, status, boardId } = req.body;

  try {
    const board = await Board.findById(boardId);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    if (board.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    const task = new Task({
      title,
      description,
      status,
      board: boardId,
    });

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Update Task
exports.updateTask = async (req, res) => {
  const { title, description, status } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const board = await Board.findById(task.board);
    if (board.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Delete Task
exports.deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    const board = await Board.findById(task.board);
    if (board.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }
    await Task.deleteOne({ _id: req.params.id });
    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Get all tasks of a board
exports.getTask = async(req,res) => {
  try {
    const board = await Boards.findById(req.params.id);

    if(!board){
      return res.status(404).json({msg:"Board not found"});
    }

    if(board.user.toString() !== req.user.id){
      return res.status(401).json({msg:"Not authorized"})
    }

    const task = await Task.find({board:req.params.id});
    res.json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
};
