
function authMiddleware(req, res, next) {
  if (!req.user) {
    res.redirect('/auth/login');
  }

  else{
    next();
  }
}

module.exports = authMiddleware;