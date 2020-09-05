import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError } from '@lmticketsorg/common';
import { User } from '../models/user';

const router = express.Router();

// express middleware used as second arg
router.post('/api/users/signup', 
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid!'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20})
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest, 
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use homeslice!');
    }

    const user = User.build({ email, password });

    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({
      id: user.id,
      email: user.email
    }, process.env.JWT_KEY!); // synch call since we didnt provide callback
    // The signing key above should NEVER be hardcoded
    // Adding ! tells TS that the variable actually IS defined

    // Store it on session object
    req.session = {
      jwt: userJwt
    }; // cant assign directly to jwt because of TS

    res.status(201).send(user);
  }
);

export { router as signupRouter };
