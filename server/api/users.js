const express = require('express');
const router = express.Router();

const { User } = require('../db').models;
const { Team } = require('../db').models;



// find all users
router.get('/', (req, res, next) => {
  User.findAll({
    include: [ Team ]
  })
    .then(users => res.send(users))
    .catch(error => next(error))
});


// find user by ID
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).send('<h1>User Not Found</h1>')
      }
      else {
        res.send(user)
      }
    })
    .catch(error => next(error))
})


// create user
router.post('/', (req, res, next) => {
  User.create(req.body)
    .then(user => res.status(201).send(user))
    .catch(error => next(error))
})


// edit user
router.put('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).send('<h1>User Not Found</h1>')
      }
      else {
        return user.update(req.body)
      }
    })
    .then(user => res.send(user))
    .catch(error => next(error))
})


// delete user
router.delete('/:id', (req, res, next) => {

  User.findById(req.params.id)
    .then(user => {
      if(!user) {
        res.status(404).send('<h1>user Not Found!</h1>')
      }
      else {
        user.destroy()
        res.sendStatus(204)
      }
    })
    .catch(error => next(error))

})



module.exports = router;
