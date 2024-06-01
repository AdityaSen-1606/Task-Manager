const mongoose = require("mongoose");
const Task = require("./Task");

const BoardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

BoardSchema.pre("remove", async function (next) {
  try {
    await Task.deleteMany({ board: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("Board", BoardSchema);
