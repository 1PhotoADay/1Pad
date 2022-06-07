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

const getChar = (`SELECT p.*, s.name AS species, l.name AS homeworld 
FROM people p
  JOIN species s ON p.species_id = s._id 
  JOIN planets l ON p.homeworld_id = l._id`);

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