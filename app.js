const express = require('express');
const cookieParser = require('cookie-parser');
const env = require('dotenv');
const router = require('./routers/routes');
const {
  checkUser,
} = require('./middleware/AuthMiddleware');

const app = express();
env.config()
app.use(express.static(`${__dirname}/public`));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.json())

//
// app.use(checkCurrentLogin)
app.use('*', checkUser)

app.use(router);

app.listen(process.env.PORT, () => {
  console.log(`Server Running ${process.env.PORT}`);
});
