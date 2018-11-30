const express = require('express');
const router = express.Router();

const { Game } = require('../db').models;



router.get('/', (req, res, next) => {
  Game.findAll()
    .then(games => res.send(games))
    .catch(error => next(error))
})



module.exports = router;
