import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidation, loginValidation } from "../validation/auth.validation.js";
import {authLimiter} from "../middlewares/rateLimiter.middleware.js"
const router = Router();

router.post("/register",authLimiter, validate(registerValidation), register);
router.post("/login", authLimiter, validate(loginValidation), login);

export default router;
