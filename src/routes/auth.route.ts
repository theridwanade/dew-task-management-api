import { Router } from "express";
import { login, logout, signup } from "../controller/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

const authRouter = router;
export default authRouter;
