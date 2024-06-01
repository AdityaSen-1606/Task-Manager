const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");

//Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

//connection to database
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/board',boardRoutes);
app.use('/api/tasks', taskRoutes);


app.listen(port,()=>{
    console.log("Server is running");
})