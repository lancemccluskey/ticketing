import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('starting up!');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {  
    // the / at the end of mongodb is the name of the db
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Auth Service -> Port 3000!!!');
  });
};

start();
