const dbConn = require('../config/database')

const RootModels = {
  /* ====== Register Model ===== */
  insertRegisterM: async (userName, userMail, userPass) => {
    try {
      const insertRegis = 'INSERT INTO `register_with_jwt`(`user_name`, `user_mail`, `user_pass`) VALUES (?,?,?)';
      const values = [userName, userMail, userPass];

      return await dbConn.promise().execute(insertRegis, values);
    } catch (err) {
      console.log('DB err', err);
      return err;
    }
  },
  /* ====== Catch  mail form DB ===== */
  mailCatchM: async (mail) => {
    const getMail = 'SELECT * FROM `register_with_jwt` WHERE user_mail = ?';
    const value = [mail];
    const [row] = await dbConn.promise().execute(getMail, value);
    return row;
  },
};

module.exports = RootModels;
