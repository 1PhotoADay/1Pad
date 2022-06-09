const db = require('../models');

const photoControllers = {};

// get all of a user's photos
photoControllers.getAllUserPhotos = async (req, res, next) => {
  const { userId } = req.params;
  const queryString = `SELECT * FROM photos WHERE userid = ($1)`;
  try {
    const allPhotos = await db.query(queryString, [userId]);
    res.locals.allPhotos = allPhotos.rows;
    return next();
  } catch (err) {
    return next({
      log: "Error occurred getting all of user's photos. Try again",
      message: { err: 'Error querying database for photos.' },
    });
  }
};

// get photos by userId and tag
photoControllers.getPhotosByTag = async (req, res, next) => {
  const { userId } = req.params;

  const { tags } = req.query;
  console.log('Tags being sent back', tags);
  const queryString = `SELECT * FROM photos WHERE userid=($1) AND tags LIKE ($2)`;
  try {
    const taggedPhotos = await db.query(queryString, [userId, `%${tags}%`]);
    res.locals.taggedPhotos = taggedPhotos.rows;
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
  let { userId } = req.params;
  const { takenAt, tags, url, comments } = req.body;
  userId = parseInt(userId);

  const queryString = `INSERT INTO photos (url, userid, takenat, tags, comments) VALUES ($1, $2, $3, $4, $5)`;
  try {
    await db.query(queryString, [url, userId, takenAt, tags, comments]);
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
  let { userId } = req.params;
  let { photoId } = req.query;
  userId = parseInt(userId);
  photoId = parseInt(photoId);
  console.log(userId, photoId);
  const queryString = `SELECT * FROM photos WHERE userid=($1) AND id=($2)`;
  try {
    const photo = await db.query(queryString, [userId, photoId]);
    res.locals.photo = photo.rows;
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
  let { userId } = req.params;
  let { photoId } = req.query;
  [userId, photoId] = [parseInt(userId), parseInt(photoId)];
  // console.log(photoId);
  const queryString = `DELETE FROM photos WHERE userid=($1) AND id=($2)`;
  try {
    await db.query(queryString, [userId, photoId]);
    return next();
  } catch (err) {
    return next({
      log: 'Error occurred deleting a photo. Try again',
      message: { err: 'Error deleting from photos by userId and photoId.' },
    });
  }
};

// updating a photo by id
photoControllers.updatePhoto = async (req, res, next) => {
  const { userId } = req.params;
  const { photoId } = req.query;
  const { takenAt, tags, url, comments } = req.body;
  const queryString = `UPDATE photos SET url=($1), takenat=($2), tags=($3), comments=($4) WHERE userid=($5) AND id=($6)`;
  try {
    await db.query(queryString, [
      url,
      takenAt,
      tags,
      comments,
      userId,
      photoId,
    ]);
    return next();
  } catch (err) {
    return next({
      log: `Error occurred updating a photo. Try again. ${err.message}`,
      message: { err: 'Error updating a photo by userId and photoId.' },
    });
  }
};

module.exports = photoControllers;
