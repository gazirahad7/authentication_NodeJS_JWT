const router = require('express').Router();
const RootController = require('../controllers/RootController');
/* ======== import files ========= */
const {
  requireAuth,
  checkCurrentLogin,
} = require('../middleware/AuthMiddleware');

const { singupValidator, loginValidator } = require('../middleware/validator/userValidator');
const decorateHtmlResponse = require('../middleware/decorateHtmlResponse');
/* ======= Get Routes ======= */
router.get(
  '/login',
  decorateHtmlResponse('Login'),
  checkCurrentLogin,
  RootController.newlogin,
);
router.get(
  '/',
  decorateHtmlResponse('Home'),
  requireAuth,
  RootController.profile,
);
router.get(
  '/register',
  decorateHtmlResponse('Register'),
  checkCurrentLogin,
  RootController.registerC,
);
router.get('/logout', RootController.logout);

/* ======= Post routes ======== */
router.post(
  '/register',
  decorateHtmlResponse('Register'),
  singupValidator,
  RootController.insertRegisterC,
);
router.post('/login', decorateHtmlResponse('Login'), loginValidator, RootController.loginC)

// exports here
module.exports = router;
