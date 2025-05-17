const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const sessionMiddleware = require('./sessionConfig');
const authRoutes = require('./authRoutes');

function authLite({ mongoUri }) {
  const app = express();

  mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.json());
  app.use(sessionMiddleware);

  app.use('/auth', authRoutes);

  return app;
}

module.exports = authLite;
