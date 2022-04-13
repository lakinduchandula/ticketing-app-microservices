import { natsWrapper } from './nats-wrapper';

import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
  // check before application start environment variables get defined correctly
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL is not defined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID is not defined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID is not defined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => {
      // intercept
      natsWrapper.client.close(); // call to close in line 13
    });

    process.on('SIGTERM', () => {
      // terminate
      natsWrapper.client.close(); // call to close in line 13
    });

    new OrderCreatedListener(natsWrapper.client).listen();
    
  } catch (err) {
    console.log('Error Pop-up ==> ' + err);
  }
};

start();
