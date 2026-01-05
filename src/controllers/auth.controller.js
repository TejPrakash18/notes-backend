import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser } from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { loginUser } from "../services/auth.service.js";


export const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await registerUser({ username, password });

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const result = await loginUser({ username, password });

  res
    .status(200)
    .json(new ApiResponse(200, "Login successful", result));
});