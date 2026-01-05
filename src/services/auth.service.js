import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { jwtConfig } from "../config/jwt.js";

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

export const loginUser = async ({ username, password }) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new ApiError(401, "Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    jwtConfig.secret,
    { expiresIn: jwtConfig.expiresIn }
  );

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
    },
  };
};