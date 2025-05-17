# authjs-lite

![npm version](https://img.shields.io/npm/v/authjs-lite.svg)
![license](https://img.shields.io/npm/l/authjs-lite.svg)

A lightweight plug-and-play Express authentication system using `express-session`.  
Easily add login and register routes to any backend project with just a few lines.

## ✨ Features

- 🚀 **Quick setup** - Integration in less than 5 minutes
- 🔐 **Session-based authentication** - Secure cookie-based sessions
- 🧱 **MongoDB integration** - Seamless user credential storage in 'Auth' collection
- ✅ **Ready-to-use routes** - `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/me`
- 🪶 **Lightweight** - Minimal dependencies, small footprint
- 🛡️ **Security focused** - Password hashing and secure sessions by default

## 📦 Installation

```bash
npm install authjs-lite
```

## 🛠️ Usage

In your Express backend:

```javascript
import express from 'express';
import authLite from 'authjs-lite';

const app = express();

// Body parser middleware is automatically included
app.use(authLite({
  mongoUri: 'mongodb://localhost:27017/my-auth-db', // Optional if already connected with Mongoose
  // Additional options (all optional):
  // prefix: '/api/auth',        // Change route prefix (default: '/auth')
  // sessionSecret: 'your-very-secure-secret',  // Secret for session encryption
  // expiresIn: '7d',            // Session expiration time
}));

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
```

## 📋 Available Routes

| Method | Route | Description | Request Body | Response |
|--------|-------|-------------|--------------|----------|
| `POST` | `/auth/register` | Register a new user | `{ username, password, [email] }` | `{ success: true, user: { id, username } }` |
| `POST` | `/auth/login` | Login existing user | `{ username, password }` | `{ success: true, user: { id, username } }` |
| `GET`  | `/auth/logout` | Logout the session | - | `{ success: true }` |
| `GET`  | `/auth/me` | Get current user info | - | `{ id, username, [email] }` or `null` |

## 🔒 Authentication Middleware

Protect your routes with the included middleware:

```javascript
import { requireAuth } from 'authjs-lite';

// Protect a single route
app.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

// Protect a group of routes
app.use('/admin', requireAuth, adminRouter);
```

## ⚠️ Frontend Integration

Enable credentials when using fetch or axios:

```javascript
// Using fetch
fetch('/auth/login', {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username, password })
})
.then(res => res.json())
.then(data => console.log(data));

// Using axios
axios.post('/auth/login', 
  { username, password },
  { withCredentials: true }
);
```

## 🔧 Advanced Configuration

```javascript
app.use(authLite({
  mongoUri: 'mongodb://localhost:27017/my-auth-db',
  prefix: '/api/auth',              // Change route prefix
  sessionSecret: 'super-secret',    // Custom session secret (highly recommended)
  expiresIn: '30d',                 // Session duration
  collection: 'custom_users',       // MongoDB collection name (default: 'users')
  usernameField: 'email',           // Use email as login identifier
  passwordMinLength: 8,             // Minimum password length
  cookie: {                         // Custom cookie options
    secure: true,                   // HTTPS only
    sameSite: 'strict'              // CSRF protection
  }
}));
```

## 📝 License

MIT

### 🤝 Contributors

- Manzi Dallas
- Nkiko Hertie

## 🤝 Contributing

Contributions, issues and feature requests are welcome!
