const express = require('express');
const router = express.Router();
const { hashPassword } = require('../utils/hash');

const db = require('../models');

router.post('/signup', async (req, res, next) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password, next);
  const queryString = `SELECT username FROM users WHERE username=($1)`;
  const insertString = `INSERT INTO users (username, password) VALUES ($1), ($2) RETURNING id`;
  try {
    const userExists = await db.query(queryString, [username]);
    if (userExists.rowCount === 0) {
      const { id } = await db.query(insertString, [username, hashedPassword]);
      res.locals.userId = id;
      next();
    }
  } catch (err) {
    return next({
      log: 'Error occurred with signup. Try again',
      message: { err: 'Must have a username and password' },
    });
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const pass = `SELECT password from users WHERE username = ($1)`;
    let VALUES = username;
    const passwordQuery = await db.query(query, VALUES);
    const response = await passwordQuery;
    if (password === response) {
      const id = `SELECT id from users WHERE username = ($1)`;
      VALUES = username;
      const idQuery = await db.query(id, VALUES);
      const userId = await idQuery;
      res.locals.userId = userId;
      res.json(userId);
    }
  } catch (err) {
    next({
      log: `authRouter login : ERROR: ${err}`,
      message: { err: 'Error occurred in authRouter login.' },
    });
  }
});
