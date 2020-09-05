import { Publisher, Subjects, TicketUpdatedEvent } from '@lmticketsorg/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
