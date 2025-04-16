import { Router } from "express";
import { createNewTask } from "../controller/task.controller";

const router = Router();

router.post("/create", createNewTask);


const taskRouter = router;
export default taskRouter;
