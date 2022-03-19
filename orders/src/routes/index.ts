import express, { Request, Response } from 'express';

/**
 * Any user needs to get a list of orders they must signed up and authenticated first
 */
import { requireAuth } from '@lc-tickets/common';

import { Order } from '../models/order';

const router = express.Router();

router.get(
  '/api/orders',
  requireAuth,
  async (req, res) => async (req: Request, res: Response) => {
    const orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate('ticket');

    res.send(orders);
  }
);

export { router as indexOrderRouter };
