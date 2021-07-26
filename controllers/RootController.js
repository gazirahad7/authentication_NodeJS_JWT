const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const RootModels = require('../models/RootModels');
require('dotenv').config()

const maxAge = 3 * 24 * 60 * 60 * 1000;
// const createToken = (mail) => jwt.sign({ mail }, 'rahad_secret', {
//   expiresIn: maxAge,
// })

const RootController = {
  /* ====== Login Controller  ====== */
  loginC: async (req, res) => {
    const { mail, password } = req.body;
    console.log('Body', mail, password);
    // error msg
    const errors = validationResult(req).formatWith((error) => error.msg);
    if (!errors.isEmpty()) {
      return res.render('pages/login', {
        error: errors.mapped(),
        value: { mail, password },
      });
    }
    try {
      const user = await RootModels.mailCatchM(mail);
      const userName = user[0].user_name;
      const userMail = user[0].user_mail;
      const userPass = user[0].user_pass;
      if (user) {
        const isValidPassword = await bcrypt.compare(password, userPass);
        if (isValidPassword) {
          const token = jwt.sign(
            {
              userName,
              userMail,
            },
            process.env.JWT_SECRET,
            { expiresIn: maxAge },
          );
          res.cookie('jwt', token, { maxAge });
          res.redirect('/');
        } else {
          res.render('pages/login', { auth: true });
        }
      } else {
        res.render('pages/login', { auth: true });
      }
    } catch (err) {
      res.render('pages/login', {
        auth: true,
        data: {
          mail: req.body.mail,
        },
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },
  /* ====== New register  Controller  ====== */

  registerC: async (req, res) => {
    res.render('pages/register');
  },
  /* ====== New login Controller  ====== */

  newlogin: async (req, res) => {
    res.render('pages/login');
  },
  /* ====== Profile Controller  ====== */
  profile: async (req, res) => {
    res.render('pages/profile');
  },

  /* ====== Register controller ====== */
  insertRegisterC: async (req, res) => {
    const { userName, userMail, userPass } = req.body;
    const errors = validationResult(req).formatWith((error) => error.msg);

    if (!errors.isEmpty()) {
      return res.render('pages/register', {
        error: errors.mapped(),
        value: { userName, userMail, userPass },
      });
    }
    try {
      const hashPassword = await bcrypt.hash(userPass, 10);
      const registerData = await RootModels.insertRegisterM(
        userName,
        userMail,
        hashPassword,
      );
      console.log('register data', registerData);
      return res.render('pages/register', { auth: true });
    } catch (err) {
      return res.render('pages/register', { registerFail: true });
    }
  },
  /* ====== Logout Controller  ====== */
  logout: async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
  },
};

// exports
module.exports = RootController
