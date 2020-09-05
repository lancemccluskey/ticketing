import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from '@lmticketsorg/common';
import { TicketCreatedListener } from '../ticket-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';

const setup = async () => {
  // Create an instance of the listener
  const listener = new TicketCreatedListener(natsWrapper.client);

  // Create a fake data event
  const data: TicketCreatedEvent['data'] = {
    version: 0,
    id: mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
    userId: mongoose.Types.ObjectId().toHexString(),
  };

  // Create a fake message object
  // * The below tells TS to ignore any prop issues
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  };

  return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
  const { listener, data, msg } = await setup();
  console.log('setup complete');
  // Call onMessage func with data obj + message obj
  await listener.onMessage(data, msg);
  console.log('onMessage sent');
  // Make assertions ticket was created
  const ticket = await Ticket.findById(data.id);
  console.log('ticket found');
  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  // Call onMessage func with data obj + message obj
  await listener.onMessage(data, msg);

  // Make assertions ticket was created
  expect(msg.ack).toHaveBeenCalled();
});
