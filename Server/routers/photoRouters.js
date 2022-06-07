const express = require('express');
const router = express.Router();
const photoControllers = require('../controllers/photoControllers');
const db = require('../models');

router.put('/:userid/photoId={photoId}', photoControllers.updatePhoto, (req, res) => {
    res.sendStatus(200);
});

router.get('/:userId/photoId={photoId}', photoControllers.getPhotoById, (req, res) => {
    res.status(200).json(res.locals.photo);
});

router.delete('/:userId/photoId={photoId}', photoControllers.deletePhoto, (req, res) => {
    res.sendStatus(200);
});

router.get('/:userId/tag={tag}', photoControllers.getPhotosByTag, (req, res) => {
    res.status(200).json(res.locals.taggedPhotos);
});

router.get('/:userId', photoControllers.getAllUserPhotos, (req, res) => {
    res.status(200).json(res.locals.allPhotos);
});

router.post('/', photoControllers.postPhoto, (req, res) => {
    res.sendStatus(200);
});


module.exports = router;
