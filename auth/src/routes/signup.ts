import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { User } from '../models/user';
import { BadRequestError, validateRequest } from '@lc-tickets/common';

const router = express.Router();

// stage-1 post signup handler
router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be length between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      // console.log("Email in use");
      // return res.send({});

      throw new BadRequestError('Email is already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY! // "!" implies that we know exactly the type of JWT_KEY and it's verified
    );

    // Store it on session object
    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signUpUserRouter };
