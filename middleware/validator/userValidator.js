const { check } = require('express-validator')
/* ==== Singup validator ===== */
const singupValidator = [

  check('userName').isLength({ min: 1 }).withMessage('Name is required'),
  check('userMail').isLength({ min: 1 }).withMessage('Email is required'),
  check('userPass').isLength({ min: 1 }).withMessage('Password is required'),
]
/* ===== Login validator ===== */
const loginValidator = [
  check('mail').isLength({ min: 1 }).withMessage('Email is required'),
  check('password').isLength({ min: 1 }).withMessage('Password is required'),
]
module.exports = { singupValidator, loginValidator }
