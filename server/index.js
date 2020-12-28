'use strict';

require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');

const helmet = require('helmet');
const app = express();
app.use(helmet());
app.use(bodyParser.json({ limit: '50mb' }));

const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
