const express = require('express');
const router = express.Router();

const { Images } = require('../db').models;


router.get('/', (req, res, next) => {
  Images.findAll()
    .then(images => res.send(images))
    .catch(error => next(error))
})



module.exports = router;
