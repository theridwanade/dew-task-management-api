import User from "../../models/users.model";
import Email from "../../utils/email";
import { hashData } from "../../utils/hashData";

export const createUser = async (data: any) => {
  try {
    const { email, password, firstname, lastname } = data;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return {
        error: true,
        message: "User with this email already exists",
        code: 409,
      };
    }

    // Hash password
    const hashedPassword = await hashData(password);

    // Create new user
    const newUser = new User({
      email,
      password: hashedPassword,
      firstname: firstname || "",
      lastname: lastname || "",
    });

    await newUser.save();

    // Send welcome email
    const emailHandler = new Email(email);
    await emailHandler.init();
    await emailHandler.sendEmail();
  } catch (error) {
    throw error;
  }
};
