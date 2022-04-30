import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY =
  'sk_test_51IyWS2DKWbb0YVu6KiDZIy9XoGwJ7PcUpxM7XDMjtwiCvYYipoLVt6fF3ivwKuU4k0EPuwh766XqFCSvrI8SXabs00i8BEJ41R';

let mongo: any;

// this hook will run before all tests
beforeAll(async () => {
  jest.clearAllMocks();
  process.env.JWT_KEY = 'private key';
  mongo = await MongoMemoryServer.create();
  const mongoURI = mongo.getUri();

  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// this hook will run before each-and-every test
beforeEach(async () => {
  // get all collections
  const collections = await mongoose.connection.db.collections();

  // delete each collection
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// this will run afterAll tests
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // build a JWT payload { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'lakindu@test.com',
  };

  // create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object. {jwt: MY_JWT}
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as based64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};
