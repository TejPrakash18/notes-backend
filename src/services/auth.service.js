import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const registerUser = async ({ username, password }) => {
  const existingUser = await User.findOne({ where: { username } });

  if (existingUser) {
    throw new ApiError(409, "Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  return {
    id: user.id,
    username: user.username,
  };
};
