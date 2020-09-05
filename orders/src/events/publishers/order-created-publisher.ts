import { Publisher, OrderCreatedEvent, Subjects } from '@lmticketsorg/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
