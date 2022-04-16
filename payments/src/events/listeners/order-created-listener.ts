import {
  Subjects,
  Listener,
  OrderCreatedEvent,
  OrderStatus,
} from '@lc-tickets/common';
import { Message } from 'node-nats-streaming';
import { Order } from '../../model/order';
import { queueGroupName } from './queue-group-name';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const order = await Order.build({
      id: data.id,
      status: data.status,
      version: data.version,
      userId: data.userId,
      price: data.ticket.price,
    });

    await order.save();

    msg.ack();
  }
}

