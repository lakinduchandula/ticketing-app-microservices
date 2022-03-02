import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  // check before application start environment variables get defined correctly
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY is not defined');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
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
