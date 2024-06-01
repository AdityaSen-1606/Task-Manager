import React from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { removeTask } from "../api";
import { Navigate } from "react-router-dom";

const TaskModal = ({ task, onClose }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    // Handle update task logic
    handleCloseMenu();
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    const taskId = task._id;
    try {
        await removeTask({token, taskId});
        Navigate("/workspace");
    } catch (err) {
        console.error("Error in removing task", err);
    }
    handleCloseMenu();
  };


  return (
    <Modal open={true} onClose={onClose}>
      <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 w-96 h-64 shadow-lg">
        <Typography variant="h6">{task.title}</Typography>
        <IconButton className="absolute top-2 right-2" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleUpdate}>Update Task</MenuItem>
          <MenuItem onClick={handleDelete}>Delete Task</MenuItem>
        </Menu>
        <Typography variant="body2" className="absolute top-2 right-12">
          {task.status}
        </Typography>
        <Typography variant="body1" className="mt-4 overflow-y-auto">
          {task.description}
        </Typography>
      </Box>
    </Modal>
  );
};

export default TaskModal;
