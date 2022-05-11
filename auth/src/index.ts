import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('==>> STARTING UP ===');
  // check before application start environment variables get defined correctly
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI is not defined');
  }

  try {
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
