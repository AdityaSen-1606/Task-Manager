const Board = require("../models/Boards");

//Create new board
exports.createBoard = async (req, res) => {
  const { name } = req.body;

  try {
    const board = new Board({
      name,
      user: req.user.id,
    });

    await board.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Get all board for logged-in user
exports.getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user.id });
    res.json(boards);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Update Board
exports.updateBoard = async (req, res) => {
  const { name } = req.body;

  try {
    let board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({
        msg: "Board not found",
      });
    }

    if (board.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    board.name = name;
    await board.save();
    res.json(board);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

//Delete board
exports.deleteBoard = async (req, res) => {
  try {
    let board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    if (board.user.toString() != req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await Board.deleteOne({ _id: req.params.id });
    res.json({ msg: "Board removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
