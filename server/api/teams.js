const express = require('express');
const router = express.Router();

const { User } = require('../db').models;
const { Team } = require('../db').models;



// find all teams
router.get('/', (req, res, next) => {
  Team.findAll({
    include: [ User ]
  })
    .then(users => res.send(users))
    .catch(error => next(error))
});


// find team by ID
router.get('/:id', (req, res, next) => {
  Team.findById(req.params.id)
    .then(Team => {
      if(!Team) {
        res.status(404).send('<h1>Team Not Found</h1>')
      }
      else {
        res.send(Team)
      }
    })
    .catch(error => next(error))
})


// create team
router.post('/', (req, res, next) => {
  Team.create(req.body)
    .then(Team => res.status(201).send(Team))
    .catch(error => next(error))
})


// edit team
router.put('/:id', (req, res, next) => {
  Team.findById(req.params.id)
    .then(team => {
      if(!team) {
        res.status(404).send('<h1>Team Not Found</h1>')
      }
      else {
        return team.update(req.body)
      }
    })
    .then(team => res.send(team))
    .catch(error => next(error))
})


// delete team
router.delete('/:id', (req, res, next) => {

  Team.findById(req.params.id)
    .then(team => {
      if(!team) {
        res.status(404).send('<h1>Team Not Found!</h1>')
      }
      else {
        team.destroy()
        res.sendStatus(204)
      }
    })
    .catch(error => next(error))

})



module.exports = router;
