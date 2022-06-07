const express = require('express');
const router = express.Router();
const photoControllers = require('../controllers/photoControllers');

router.patch('/:userId/photos', photoControllers.updatePhoto, (req, res) => {
  res.sendStatus(200);
});

router.get('/:userId/photos', photoControllers.getPhotoById, (req, res) => {
  res.status(200).json(res.locals.photo);
});

router.delete('/:userId/photos', photoControllers.deletePhoto, (req, res) => {
  res.sendStatus(200);
});

// tagged photos
router.get('/:userId/tags', photoControllers.getPhotosByTag, (req, res) => {
  res.status(200).json(res.locals.taggedPhotos);
});

// all of a user's photos
router.get('/:userId', photoControllers.getAllUserPhotos, (req, res) => {
  res.status(200).json(res.locals.allPhotos);
});

// post photo
router.post('/:userId', photoControllers.postPhoto, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
