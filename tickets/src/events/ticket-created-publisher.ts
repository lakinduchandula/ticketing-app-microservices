import { Publisher, Subjects, TicketCreatedEvent } from '@lc-tickets/common';
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
