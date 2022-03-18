import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
  requireAuth,
  validateRequest,
} from '@lc-tickets/common';
import { body } from 'express-validator';
import mongoose from 'mongoose';
import { Ticket } from '../models/ticket';
import { Order } from '../models/order';

const router = express.Router();

router.post(
  '/api/orders',
  requireAuth,
  [
    body('ticketId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input)) // this will check whether "input" is valid mongo_id or not
      .withMessage('TicketId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { ticketId } = req.body;

    // Find the ticket the user is trying to order in the database
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      throw new NotFoundError();
    }

    // Make sure that ticket is not already reserved
    /**
     ** Run query to look at all orders, Find an order where the ticket
     ** is the ticket we just found (i.e ticket) AND the orders status is NOT cancelled
     ** If we find an order from that means the ticket IS reserved
     */

    const existingOrder = await Order.findOne({
      ticket: ticket,
      status: {
        $in: [
          OrderStatus.Created,
          OrderStatus.AwaitingPayment,
          OrderStatus.Completed,
        ],
      },
    });

    if (existingOrder) {
      throw new BadRequestError('Ticket is already reserved!');
    }
    // Calculation an expiration date for this order

    // Build the order and save it to the database

    // Publish an event saying that an order was created

    res.send({});
  }
);

export { router as newOrderRouter };
