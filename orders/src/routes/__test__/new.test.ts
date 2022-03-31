import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
import { Ticket } from '../../models/ticket';
import { Order, OrderStatus } from '../../models/order';

it('returns an error if the ticket does not exist', async () => {
  const ticketId = mongoose.Types.ObjectId();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId })
    .expect(404);
});

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'One Direction',
    price: 659,
  });

  await ticket.save();

  const order = Order.build({
    userId: '2Pre1mlUUXVnk80',
    status: OrderStatus.Created,
    expiresAt: new Date(),
    ticket: ticket,
  });

  await order.save();

  await request(app)
    .post('/api/orders/')
    .set('Cookie', global.signin())
    .send({ order })
    .expect(400);
});

it('reserves a ticket', async () => {
  const ticket = Ticket.build({
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'Adam Levine',
    price: 399,
  });

  await ticket.save();

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ ticketId: ticket.id })
    .expect(201);
});

it.todo('emits an order created event');
