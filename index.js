/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import express from 'express';
import logger from 'morgan';
import Debug from 'debug';
import cors from 'cors';

import routes from './server/routes';

const app = express();
const debug = Debug('dev');
const PORT = process.env.PORT || 7777;
const API_ROUTE_PREFIX = '/api/v1';

app.use(cors());
app.use(express.json());
app.use(express({ extended: false }));
app.use(logger('dev'));
app.use(API_ROUTE_PREFIX, routes);

// Should render the static html page
app.get('/', (req, res) =>
  res.status(200).json({ status: 'success', message: 'Team-Lead-Picker App' })
);

app.use((err, req, res, next) => {
  debug(err.stack);
  return res.status(500).json({
    status: 'error',
    message: 'Something broke. Please try again or check back for a fix'
  });
});

// TODO: Error handler for unknown routes

app.listen(PORT, () => debug(`Server ruuning on PORT:${PORT}`));
