import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const TaskCard = ({ task, onClick }) => {
  return (
    <Card className="mb-2 cursor-pointer" onClick={onClick}>
      <CardContent>
        <Typography variant="h6">{task.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {task.status}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
