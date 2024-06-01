import React, { useState } from "react";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import CreateTaskModal from "./CreateTaskModal";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { createTask, deleteBoard } from "../api";

const BoardCard = ({ title, tasks ,update, check}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
  const open = Boolean(anchorEl);
  const boardId = title.split('+')[1];

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUpdateBoard = () => {
    check(true);
    update({title,boardId});
    handleMenuClose();
  };

  const handleDeleteBoard = async() => {
    const token = localStorage.getItem("token");
    try {
        await deleteBoard({token,boardId});
    } catch (err) {
        console.error("Error in deleting Board", err);
    }
    handleMenuClose();
  };

  const handleCreateTask = () => {
    setIsCreateTaskModalOpen(true);
  };

  const handleCreateTaskSubmit = async ({ title, description, status }) => {
    const token = localStorage.getItem("token");
    try {
        const response = await createTask({title,description,status,token, boardId})
    } catch (err) {
        console.error("Error in create task",err);
    }
    setIsCreateTaskModalOpen(false);
  };


  return (
    <div className="bg-white shadow-md rounded p-4 m-4 h-64 overflow-y-auto relative">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold w-64">{title.split('+')[0]}</h2>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleCreateTask}
        >
          Create Task
        </Button>
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleUpdateBoard}>Update Board</MenuItem>
          <MenuItem onClick={handleDeleteBoard}>Delete Board</MenuItem>
        </Menu>
      </div>
      <div className="mt-2">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onClick={() => setSelectedTask(task)}
          />
        ))}
      </div>
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      <CreateTaskModal
        open={isCreateTaskModalOpen}
        onClose={() => setIsCreateTaskModalOpen(false)} onSubmit={handleCreateTaskSubmit}
      />
    </div>
  );
};

export default BoardCard;
