const db = require('../models');

const photoControllers = {};

// get all of a user's photos
photoControllers.getAllUserPhotos = async (req, res, next) => {
    const { userId } = req.params;
    const queryString = `SELECT * FROM photos WHERE userId=($1)`;
    try {
        const allPhotos = await db.query(queryString, [userId]);
        res.locals.allPhotos = allPhotos;
        return next();
    } catch (err) {
      return next({
        log: 'Error occurred getting all of user\'s photos. Try again',
        message: { err: 'Error querying photos by userId.' },
      });
    }
};

// get photos by userId and tag
photoControllers.getPhotosByTag = async (req, res, next) => {
  const { userId } = req.params;
  const { tag } = req.query;
  const queryString = `SELECT * FROM photos WHERE userId=($1) AND tags=($2)`;
  try {
      const taggedPhotos = await db.query(queryString, [userId, tag]);
      res.locals.taggedPhotos = taggedPhotos;
      return next();
  } catch (err) {
    return next({
      log: 'Error occurred getting tagged photos. Try again',
      message: { err: 'Error querying photos by userId and tags.' },
    });
  }
};

// posting a photo
photoControllers.postPhoto = async (req, res, next) => {
  const { userId } = req.params;
  const { takenAt, tags, url, comments } = req.body;
  // insert string goes here
  try {
      // query to post photo
      return next();
  } catch (err) {
    return next({
      log: 'Error occurred posting a photo. Try again',
      message: { err: 'Error inserting into photos table.' },
    });
  }
};

// getting a photo by id
photoControllers.getPhotoById = async (req, res, next) => {
  const { userId } = req.params;
  const { photoId } = req.query;
  const queryString = `SELECT * FROM photos WHERE userId=($1) AND id=($2)`
  try {
      const photo = await db.query(queryString, [userId, photoId]);
      res.locals.photo = photo;
      return next();
  } catch (err) {
    return next({
      log: 'Error occurred getting a photo by id. Try again',
      message: { err: 'Error querying photos by userId and photoId.' },
    });
  }
};

// deleting a photo by id
photoControllers.deletePhoto = async (req, res, next) => {
  const { userId } = req.params;
  const { photoId } = req.query;
  const queryString = `DELETE * FROM photos WHERE userId=($1) AND id=($2)`
  try {
      const deletePhoto = await db.query(queryString, [userId, photoId]);
      res.locals.deletePhoto = deletePhoto;
      return next();
  } catch (err) {
    return next({
      log: 'Error occurred deleting a photo. Try again',
      message: { err: 'Error deleting from photos by userId and photoId.' },
    });
  }
};

// SQL updating syntax
// UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

// updating a photo by id
photoControllers.updatePhoto = async (req, res, next) => {
  const { userId } = req.params;
  const { photoId } = req.query;
  const queryString = `UPDATE photos SET `;
  try {
      // update query
      return next();
  } catch (err) {
    return next({
      log: 'Error occurred updating a photo. Try again',
      message: { err: 'Error updating a photo by userId and photoId.' },
    });
  }
};

module.exports = photoControllers;
