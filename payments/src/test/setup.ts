import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(optId?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper');

process.env.STRIPE_KEY = 'sk_test_51HNG5OAL3GrzLw2C3a8F2XXmDtNpJQYpKvRHgVUOl4oRYd0m3vzOUSImlwTrARlJKu4SVPyXZJkmBd7xxK0yw6A500D4MiZneS';

let mongo: any;
// Before ALL of the tests run
beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Before EACH test runs
beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

// AFTER all tests have run
afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (optId?: string) => {
  // generate rando id from mongoose to use
  const id = optId || new mongoose.Types.ObjectId().toHexString();

  // Build a JWT payload. { id, email }
  const payload = {
    id,
    email: 'test@test.com'
  };

  // Create the JWT!
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session object. { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return string thats the cookie with encoded data
  return [`express:sess=${base64}`]; // super test wants array
};
