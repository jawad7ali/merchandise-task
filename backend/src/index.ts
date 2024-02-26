import express, { type Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { itemRoutes, userRoutes } from './routes/v1';
import isAuth from './middleware/auth.middleware';
import { errorHandler } from './middleware/errorHandler.middleware';
import config from './config/config';
import authLimiter from './middleware/authLimiter.middleware';
import { xssMiddleware } from './middleware/xss.middleware';
import path from 'path';
import compressFilter from './utils/compressFilter.util';
import logger from './middleware/logger.middleware';

const app: Express = express();

// Helmet is used to secure this app by configuring the http-header
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(xssMiddleware());

app.use(cookieParser());

// Compression is used to reduce the size of the response body
app.use(compression({ filter: compressFilter }));

app.use(
  cors({
    // origin is given a array if we want to have multiple origins later
    origin: String(config.cors.cors_origin).split('|'),
    credentials: true
  })
);

if (config.node_env === 'production') {
  app.use('/api/v1/auth', authLimiter);
}

app.use('/api/v1/auth', userRoutes);

// Items routes are jwt protected routes
// Silent login is used to check if the token is valid or not
app.use('/api/v1/items', isAuth, itemRoutes);

app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ error: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use(errorHandler);

app.listen(Number(config.server.port), () => {
  logger.log('info', `Server is running on Port: ${config.server.port}`);
});