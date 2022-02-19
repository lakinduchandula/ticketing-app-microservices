import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;

// this hook will run before all tests
beforeAll(async () => {
  process.env.JWT_KEY = "private key";
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

global.signin = async () => {
  const email = "test@example.com";
  const password = "password";

  const response = await request(app)
    .post("/api/users/signup")
    .send({ email, password })
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};