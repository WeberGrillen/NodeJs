import 'dotenv/config';

import express from 'express';

const app = express();

import session from 'express-session';

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

import restaurantsRouter from './routers/restaurantsRouter.js';
app.use(restaurantsRouter);
import visitorsRouters from './routers/visitorsRouter.js';
app.use(visitorsRouters);


const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
    console.log('Server is running on port: ', PORT);
});