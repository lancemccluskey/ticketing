import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@lmticketsorg/common';
import { newOrderRouter } from './routes/new';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes/index';
import { showOrderRouter } from './routes/show';


const app = express();
app.set('trust proxy', true); // Traffic is proxied from nginx so express needs to know
app.use(json());
app.use(
  cookieSession({
    signed: false, // Were not handling encryption
    secure: process.env.NODE_ENV !== 'test', // Have to be on https connection
  })
);
app.use(currentUser);

app.use(newOrderRouter);
app.use(deleteOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app }; // Need to do curly braces for named export
