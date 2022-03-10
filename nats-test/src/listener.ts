import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear(); // clear the console

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  stan.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  new TicketCreatedListener(stan).listen();
});

/**
 * These are watching for interupt signals or terminate signals that are send
 * to this process any time ts-node-dev restart out program and any-time we hit
 * ctrl+c inside terminal
 */
process.on('SIGINT', () => {
  // intercept
  stan.close(); // call to close in line 13
});

process.on('SIGTERM', () => {
  // terminate
  stan.close(); // call to close in line 13
});
