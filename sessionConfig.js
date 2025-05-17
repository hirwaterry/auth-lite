const session = require('express-session');
const MongoStore = require('connect-mongo');

module.exports = (mongoUri) =>
  session({
    secret: 'auth-lite-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
    store: MongoStore.create({
      mongoUrl: mongoUri,
      collectionName: 'sessions', // optional: defaults to 'sessions'
    }),
  });