import { Subjects, PaymentCreatedEvent, Publisher } from '@lmticketsorg/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
