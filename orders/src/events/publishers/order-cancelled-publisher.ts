import { Publisher, OrderCancelledEvent, Subjects } from '@lmticketsorg/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
