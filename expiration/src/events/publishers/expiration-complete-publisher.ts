import { Subjects, Publisher, ExpirationCompleteEvent } from '@lmticketsorg/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
