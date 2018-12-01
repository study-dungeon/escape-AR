const express = require('express');
const router = express.Router();

const { Captain } = require('../db').models;



router.get('/', (req, res, next) => {
  Captain.findAll()
    .then(captains => res.send(captains))
    .catch(error => next(error))
})



module.exports = router;
