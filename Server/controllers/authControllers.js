const { hashPassword, comparePassword } = require('../utils/hash');

const db = require('../models');

const authControllers = {};

authControllers.signup = async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password, next);
  const queryString = `SELECT username FROM users WHERE username=($1)`;
  const insertString = `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`;
  try {
    const userExists = await db.query(queryString, [username]);
    if (userExists.rowCount === 0) {
      const { rows } = await db.query(insertString, [username, hashedPassword]);
      res.locals.userId = rows[0].id;
      next();
    } else {
      return next({
        log: 'Error occurred with signup. Try again',
        message: { err: 'Username already exists' },
      });
    }
  } catch (err) {
    return next({
      log: 'Error occurred with signup. Try again',
      message: { err: 'Must have a username and password' },
    });
  }
};

authControllers.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const pass = `SELECT password from users WHERE username = ($1)`;
    let VALUES = [username];
    const { rows } = await db.query(pass, VALUES);
    const savedPassword = rows[0].password;
    const isMatch = await comparePassword(password, savedPassword, next);
    console.log('isMatch', isMatch);
    if (isMatch) {
      const id = `SELECT id from users WHERE username = ($1)`;
      const { rows } = await db.query(id, [username]);
      const userId = rows[0].id;
      res.locals.userId = userId;
      next();
    } else {
      next({
        log: `authRouter login : ERROR: ${err}`,
        message: { err: 'Failed to login. Wrong username or password' },
      });
    }
  } catch (err) {
    next({
      log: `authRouter login : ERROR: ${err}`,
      message: { err: 'Error occurred in authRouter login.' },
    });
  }
};

module.exports = authControllers;
