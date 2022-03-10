import { Listener } from './base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from './ticket-created-event';
import { Subjects } from './subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  /**
   * In here "subject" variable without type annotation generate an error
   * beacuse TS think that we may change the value of "subjects" in future
   */
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = 'payment-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Evenet data!', data);

    msg.ack(); // this indicates that msg successfully having parsed
  }
}
