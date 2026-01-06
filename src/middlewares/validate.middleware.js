import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(validations.map((v) => v.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new ApiError(422, errors.array()[0].msg);
    }

    next();
  };
};
