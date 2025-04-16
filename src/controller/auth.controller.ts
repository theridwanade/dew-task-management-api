import { Request, Response } from "express";
import { createUser } from "../services/auth/signup.auth.service";
import { authenticateUser } from "../services/auth/login.auth.service";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    // Input validation
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
      return;
    }

    const status = await createUser(req.body);

    if (status!.error === true && status!.code === 409) {
      res.status(status!.code).json({
        message: status!.message,
      });
      return;
    }

    // Respond success

    res.status(201).json({
      message: "User successfully created",
      email: email,
    });
    return;
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      message: "Something went wrong during signup",
    });
    return;
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    const status = await authenticateUser(email, password);
    if (status.error) {
      res.status(status.code).json({
        message: status.message,
      });
      return;
    }

    res
      .status(status.code)
      .cookie("token", status.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3600000,
      })
      .json({
        message: status.message,
        token: status.token,
      });
    return;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      message: "Something went wrong during login",
    });
    return;
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Successfully logged out",
    });
    return;
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      message: "Something went wrong during logout",
    });
    return;
  }
};
