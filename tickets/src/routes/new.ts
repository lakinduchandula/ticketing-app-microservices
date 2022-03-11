import express, { Request, Response } from 'express';

import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@lc-tickets/common';
import { Ticket } from '../models/ticket';
import { TicketCreatedPublisher } from '../events/ticket-created-publisher';

const router = express.Router();

router.post(
  '/api/tickets',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .not()
      .isEmpty()
      .isFloat({ gt: 0 })
      .withMessage('Price sholud be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, price } = req.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: req.currentUser!.id,
    });

    await ticket.save();
    // new TicketCreatedPublisher(client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
