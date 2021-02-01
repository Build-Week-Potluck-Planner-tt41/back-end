module.exports = (role) => (req, res, next) => {
  if (req.decodeJwt && req.decodeJwt.role === role) {
    next();
  } else {
    res.status(403).json({ message: "Restricted" });
  }
};
