const express = require('express');
const router = express.Router();

const { Team } = require('../db').models;



router.get('/', (req, res, next) => {
  Team.findAll()
    .then(teams => res.send(teams))
    .catch(error => next(error))
})



module.exports = router;
