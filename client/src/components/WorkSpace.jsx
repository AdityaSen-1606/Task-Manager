import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { createBoard, getBoards, getTasks, updateBoard } from "../api";
import BoardCard from "./BoardCard";


const WorkSpace = () => {
    const [boards, setBoards] = useState({});
    const [boardName, setBoardName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentBoardId, setCurrentBoardId] = useState(null);

    useEffect(()=>{
        fetchBoards();
    }, []);

    const handleCreateBoard = async (event) => {
      event.preventDefault();
      const token = localStorage.getItem("token");
      try {
        if(isUpdating){
            await updateBoard({token,boardId:currentBoardId, name:boardName});
            setIsUpdating(false);
            setCurrentBoardId(null);
            setBoardName("");
            fetchBoards();
        }
        else{
            await createBoard({ token, name: boardName });
            setBoardName("");
            fetchBoards(); 
        }
      } catch (error) {
        console.error("Error in creating Board", error);
      }
    };

    const handleUpdateBoard = async({title, boardId})=>{
        setBoardName(title.split('+')[0]);
        setCurrentBoardId(boardId);
    }

    const fetchBoards = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getBoards(token);

        for (let i = 0; i < response.data.length; i++) {
          try {
            const responseTask = await getTasks({
              token,
              boardId: response.data[i]._id,
            });

            setBoards((prevBoards) => ({
              ...prevBoards,
              [`${response.data[i].name}+${response.data[i]._id}`]:
                responseTask.data,
            }));

          } catch (taskErr) {
            console.error(
              `Error in fetching tasks for board ${response.data[i]._id}`,
              taskErr
            );
          }
        }
      } catch (err) {
        console.error("Error in fetching boards", err);
      }
    };

    return (
      <Box display="flex" width="100%">
        <Box width="30%" p={2} border="1px solid #acc">
          <form onSubmit={handleCreateBoard}>
            <TextField
              label="Board Name"
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              {isUpdating ? "Update Board" : "Create Board"}
            </Button>
          </form>
        </Box>
        <Box width="70%" p={2} display="flex" flexWrap="wrap">
          {Object.keys(boards).map((boardName) => (
            <BoardCard
              key={boardName}
              title={boardName}
              tasks={boards[boardName]}
              update={handleUpdateBoard}
              check={setIsUpdating}
            />
          ))}
        </Box>
      </Box>
    );
}

export default WorkSpace;