const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const createSessionMiddleware = require('./sessionConfig');
const authRoutes = require('./authRoutes');
const { requireAuth } = require('./middleware');

function authLite({ mongoUri }) {
  const app = express();

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.use(cors({ origin: true, credentials: true }));
  app.use(bodyParser.json());
  app.use(createSessionMiddleware(mongoUri)); // 👈 Pass mongoUri here
  app.use('/auth', authRoutes);

  return app;
}

module.exports = authLite;
module.exports.requireAuth = requireAuth;
