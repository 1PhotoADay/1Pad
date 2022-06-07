const express = require('express');
const router = express.Router();
const photoControllers = require('../controllers/photoControllers');
const db = require('../models');

// tagged photos
router.get(`/:userId/tag=${tag}`, photoControllers.getPhotosByTag, (req, res) => {
    res.status(200).json(res.locals.taggedPhotos);
})

// all of a user's photos
router.get('/:userId', photoControllers.getAllUserPhotos, (req, res) => {
    res.status(200).json(res.locals.allPhotos);
});

// post photo
router.post('/', photoControllers.postPhoto, (req, res) => {
    res.sendStatus(200);
});


module.exports = router;
