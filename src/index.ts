import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from 'cookie-parser';
import "dotenv/config";
import { connectdb } from "./utils/connectdb";
import authRouter from "./routes/auth.route";
import taskRouter from "./routes/task.route";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.get("/", async (req, res) => {
  res.end("Dew Task management API is under development")
});

app.use("/auth/v1", authRouter);
app.use("/task/v1", taskRouter);


app.listen(PORT, (error) => {
  if (error) {
    console.log(
      `An error occured while spining the server,\n Name: ${error.name} \n Message: ${error.message} \n Cause: ${error.cause} \n Stack: ${error.stack}`
    );
  }
  connectdb();
  console.log(`Server listening at http://localhost:${PORT}`);
});
