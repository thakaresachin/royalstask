import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbconnect from "./config/connectdb.js";

import userrouter from "./router/userRoutes.js";
import usertaskrouter from "./router/taskRoutes.js";

const app = express();

dotenv.config();

// ✅ CORS (Frontend connect)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connect
Dbconnect();

// routes
app.use("/api/users", userrouter);
app.use("/api/tasks", usertaskrouter);

// server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
