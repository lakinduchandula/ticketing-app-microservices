import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

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

  const options = stan.subscriptionOptions().setManualAckMode(true);
  /**
   * Queue group is created to make-sure that Multiple instances in the same service
   * are not all going to receive the exact same event
   */
  const subscription = stan.subscribe(
    'ticket:created',
    'order-service-queue-group',
    options
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
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
