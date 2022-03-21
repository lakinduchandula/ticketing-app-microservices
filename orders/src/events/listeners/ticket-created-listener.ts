import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@lc-tickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { price, title, id } = data;

    const ticket = Ticket.build({
      id,
      title,
      price,
    });

    await ticket.save();

    /**
     * When all these steps are go as we expected and when there are no errors,
     * Tell nats-streaming server process this thing and we are good to go.
     */
    msg.ack();
  }
}
