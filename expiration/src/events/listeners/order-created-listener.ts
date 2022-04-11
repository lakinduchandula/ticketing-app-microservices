import { Listener, OrderCreatedEvent, Subjects } from '@lc-tickets/common';
import { Message } from 'node-nats-streaming';

import { queueGroupName } from './queue-group-name';

export class OrderCrearedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  onMessage(data: OrderCreatedEvent['data'], msg: Message) {
      
  }
}
