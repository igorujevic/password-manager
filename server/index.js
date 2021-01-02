'use strict';

require('dotenv').config();
const { logger, middleware: logRequests } = require('./shared/logger');
const bodyParser = require('body-parser');
const database = require('./shared/database');
const express = require('express');
const helmet = require('helmet');
const router = require('./router');
const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));

const port = process.env.SERVER_PORT || 3000;

app.use('/api/v1', logRequests, router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

function errorHandler(err, req, res, next) {
  if (!err.status || err.status === 500) {
    res.status(500).end();
    logger.error({ err });
    return;
  }
  const { status, message } = err;
  res.status(err.status).json({
    error: { status, message }
  });
}

database.initialize();
