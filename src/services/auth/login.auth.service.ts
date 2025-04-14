import User from "../../models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const authenticateUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({email});
    if(!user) {
      return {
        error: true,
        message: "User not found",
        code: 404,
      };
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return {
        error: true,
        message: "Invalid password",
        code: 401,
      };
    }
    const token = jwt.sign({
      id: user._id,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
    }, process.env.JWT_SECRET as string, {
      "expiresIn": "1h"
    })
    return {
      error: false,
      message: "User authenticated successfully",
      code: 200,
      token,
    }
  } catch (error) {
    throw error;
  }
}