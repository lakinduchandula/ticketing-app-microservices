import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  // check before application start environment variables get defined correctly
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
    await natsWrapper.connect(
      'ticketing',
      'eSqBq3IQoxmCPh6',
      'http://nats-srv:4222'
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

    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('==>> Connected to MongoDB');
  } catch (err) {
    console.log('Error Pop-up ==> ' + err);
  }

  app.listen(3000, () => {
    console.log('==>> Listening on port 3000 <<==');
  });
};

start();
