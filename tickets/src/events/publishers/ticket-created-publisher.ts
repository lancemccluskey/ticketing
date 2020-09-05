import { Publisher, Subjects, TicketCreatedEvent } from '@lmticketsorg/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
