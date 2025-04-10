import { Router } from "express";
import { hashData } from "../utils/hashData";
import User from "../models/users.model";

const router = Router();

router.post("/signup", async (req, res) => {
  const {email, password, firstname, lastname} = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Email and password are required"
    })
  }
  if (password.length < 6) {
    res.status(400).json({
      message: "Password must be at least 6 characters long"
    })
  }
  const hashedPassword = await hashData(password);

  const newUser = new User({
    email,
    password: hashedPassword,
    firstname: firstname || "",
    lastname: lastname || ""
  })

  newUser.save();

  res.status(201).json({
    message: "User successfully created",
    email: email,
  })
});

const authRouter = router;
export default authRouter;