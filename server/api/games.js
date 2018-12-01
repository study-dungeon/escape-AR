const express = require('express');
const router = express.Router();

const { Team } = require('../db').models;
const { Game } = require('../db').models;



// find all games
router.get('/', (req, res, next) => {
  Game.findAll({
    include: [ Team ]
  })
    .then(games => res.send(games))
    .catch(error => next(error))
});


// find game by ID
router.get('/:id', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => {
      if(!game) {
        res.status(404).send('<h1>Game Not Found</h1>')
      }
      else {
        res.send(game)
      }
    })
    .catch(error => next(error))
})


// create game
router.post('/', (req, res, next) => {
  Game.create(req.body)
    .then(game => res.status(201).send(game))
    .catch(error => next(error))
})


// edit game
router.put('/:id', (req, res, next) => {
  Game.findById(req.params.id)
    .then(game => {
      if(!game) {
        res.status(404).send('<h1>Game Not Found</h1>')
      }
      else {
        return game.update(req.body)
      }
    })
    .then(game => res.send(game))
    .catch(error => next(error))
})


// delete game
router.delete('/:id', (req, res, next) => {

  Game.findById(req.params.id)
    .then(game => {
      if(!game) {
        res.status(404).send('<h1>Game Not Found!</h1>')
      }
      else {
        game.destroy()
        res.sendStatus(204)
      }
    })
    .catch(error => next(error))

})





module.exports = router;
