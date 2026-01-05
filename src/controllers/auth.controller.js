import { asyncHandler } from "../utils/asyncHandler.js";
import { registerUser } from "../services/auth.service.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await registerUser({ username, password });

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", user));
});
