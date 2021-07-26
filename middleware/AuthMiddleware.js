const jwt = require('jsonwebtoken');
const RootModels = require('../models/RootModels');
require('dotenv').config();
/* ==== Require auth ==== */
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        // console.log(err.massage);
        res.redirect('/login');
      } else {
        // console.log('Decoded', decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login')
  }
}
/* ===== check user ====== */
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        // console.log(err.massage);
        res.locals.user = null;
        next();
        // res.redirect('/login');
      } else {
        // console.log('Decoded', decodedToken);
        const user = await RootModels.mailCatchM(decodedToken.userMail);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next()
  }
};

/* ==== check login ==== */
const checkCurrentLogin = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    res.redirect('/');
  } else {
    // res.redirect('/login');
    next()
  }
}
// exports function
module.exports = { requireAuth, checkUser, checkCurrentLogin };
