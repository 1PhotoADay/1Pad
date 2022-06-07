const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const hash = {};
hash.hashPassword = async (password, next) => {
  try {
    const hash = await bcrypt.hash(password, SALT_WORK_FACTOR);
    return hash;
  } catch (err) {
    return next({
      log: 'Error occurred with signup. Try again',
      message: { err: 'Error occurred with signup. Try again' },
    });
  }
};

hash.comparePassword = async (password, savedPassword, next) => {
  try {
    const isMatch = await bcrypt.compare(password, savedPassword);
    return isMatch;
  } catch (err) {
    return next({
      log: 'Error occurred with signup. Try again',
      message: { err: 'Wrong username or password' },
    });
  }
};

module.exports = hash;
