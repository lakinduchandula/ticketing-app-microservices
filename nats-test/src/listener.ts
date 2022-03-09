import nats, { Message, Stan } from 'node-nats-streaming';
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

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');
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

abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;

  abstract onMessage(data: any, msg: Message): void;

  private client: Stan; // nats-world client call => Stan
  protected ackWait = 5 * 1000; // if subclass can define it if want to default value is '5s'

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOption() {
    return this.client
      .subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName);
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOption()
    );

    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);

      const parsedData = this.parseMessage(msg);
      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === 'string'
      ? JSON.parse(data)
      : JSON.parse(data.toString('utf8'));
  }
}
