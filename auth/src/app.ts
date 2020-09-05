import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@lmticketsorg/common';

const app = express();
app.set('trust proxy', true); // Traffic is proxied from nginx so express needs to know
app.use(json());
app.use(
  cookieSession({
    signed: false, // Were not handling encryption
    secure: process.env.NODE_ENV !== 'test', // Have to be on https connection
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }; // Need to do curly braces for named export
