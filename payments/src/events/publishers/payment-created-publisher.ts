import { Subjects, Publisher, PaymentCreatedEvent } from '@lc-tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
