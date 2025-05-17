export function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
      req.user = req.session.user;
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
  