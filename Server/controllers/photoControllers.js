const db = require('../models');

const photoControllers = {};

// get all of a user's photos
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

// get photos by userId and tag
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

// posting a photo
// do req.params and req.body each have userId
photoControllers.postPhoto = async (req, res, next) => {
  const { userId } = req.params;
  const { takenAt, tags, url, comments } = req.body;
  // insert string goes here
  try {
      // query to post photo
      return next();
  }catch (err) {
    return next({
      log: 'Error occurred posting a photo. Try again',
      message: { err: 'Error querying database to insert into photos table.' },
    });
  }
}

module.exports = photoControllers;
