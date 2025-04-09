import express from "express";
import cors from "cors";
import morgan from "morgan";
import "dotenv/config";
import { connectdb } from "./utils/connectdb";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(cors());
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.end("Dew Task management API is under development")
})

app.listen(PORT, (error) => {
  if (error) {
    console.log(
      `An error occured while spining the server,\n Name: ${error.name} \n Message: ${error.message} \n Cause: ${error.cause} \n Stack: ${error.stack}`
    );
  }
  connectdb();
  console.log(`Server listening at http://localhost:${PORT}`);
});
