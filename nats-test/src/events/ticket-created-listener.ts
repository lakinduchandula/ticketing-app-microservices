import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';

export class TicketCreatedListener extends Listener {
  subject = 'ticket:created';
  queueGroupName = 'payment-service';

  onMessage(data: any, msg: Message) {
    console.log('Evenet data!', data);

    msg.ack(); // this indicates that msg successfully having parsed
  }
}
