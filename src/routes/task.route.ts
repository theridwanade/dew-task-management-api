import { Router } from "express";
import { createNewTask, unlinkTask } from "../controller/task.controller";

const router = Router();

router.post("/create", createNewTask);
router.delete("/unlink", unlinkTask);

const taskRouter = router;
export default taskRouter;
