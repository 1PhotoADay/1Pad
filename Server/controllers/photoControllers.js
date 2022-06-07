const db = require('../models');

const photoControllers = {};

photoControllers.getAllUserPhotos = async (req, res, next) => {
    const { userId } = req.params;
    const queryString = `SELECT * FROM photos WHERE userId = ($1)`;
    try {
        const allPhotos = await db.query(queryString, [userId]);
        res.locals.allPhotos = allPhotos;
        return next();
    }catch (err) {
      return next({
        log: 'Error occurred getting all of user\'s photos. Try again',
        message: { err: 'Error querying database for photos.' },
      });
    }
}

photoControllers.getPhotosByTag = async (req, res, next) => {
  const { userId } = req.params;
  const { tag } = req.query;
  const queryString = `SELECT * FROM photos WHERE userId = ($1) AND tags = ($2)`;
  try {
      const taggedPhotos = await db.query(queryString, [userId, tag]);
      res.locals.taggedPhotos = taggedPhotos;
      return next();
  }catch (err) {
    return next({
      log: 'Error occurred getting tagged photos. Try again',
      message: { err: 'Error querying database for photos by tag.' },
    });
  }
}

module.exports = photoControllers;