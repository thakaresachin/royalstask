import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Dbconnect from "./config/connectdb.js";

import userrouter from "./router/userRoutes.js";
import usertaskrouter from "./router/taskRoutes.js";

const app = express();

dotenv.config();


app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


Dbconnect();


app.use("/api/users", userrouter);
app.use("/api/tasks", usertaskrouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
