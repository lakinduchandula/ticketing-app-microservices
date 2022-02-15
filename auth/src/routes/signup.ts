import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";

const router = express.Router();

// stage-1 post signup handler
router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be length between 4 and 20 characters"),
  ],
  (req: Request, res: Response) => {
    const errors = validationResult(req);

    // check if there is any validation violations.
    if (!errors.isEmpty()) {
      throw new Error("Invalid email or password");
    }

    // validation pass
    const { email, password } = req.body;
    
    console.log("Creating a user...");
    
    throw new Error("Error connecting to database");
    res.send({});
  }
);

export { router as signUpUserRouter };
