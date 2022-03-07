import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear(); // clear the console

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

stan.on('connect', () => {
  console.log('Listener connected to NATS');

  /**
   * Queue group is created to make-sure that Multiple instances in the same service 
   * are not all going to receive the exact same event
   */
  const subscription = stan.subscribe(
    'ticket:created',
    'order-service-queue-group'
  );

  subscription.on('message', (msg: Message) => {
    const data = msg.getData();

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }
  });
});
