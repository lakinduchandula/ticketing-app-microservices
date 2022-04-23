import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
} from '@lc-tickets/common/build';
import { Order } from '../model/order';

const router = express.Router();

router.post(
  '/api/payment',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({ sucess: true });
  }
);

export { router as createChargeRouter };
