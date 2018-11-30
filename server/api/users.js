const express = require('express');
const router = express.Router();

const { User } = require('../db').models;



router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(error => next(error))
})



module.exports = router;
