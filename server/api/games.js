const express = require('express');
const router = express.Router();

const { Team } = require('../db').models;
const { Game } = require('../db').models;
const { User } = require('../db').models;

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


// create game takes a userId and weekNum, and creates a new game if one does not yet exist
router.post('/', (req, res, next) => {
  // find the current user
  const { authId, weekNum } = req.body;
  const _weekNum = weekNum * 1;
  const currUser = User.findByPk(authId);
  // if the user has a team, store it
  const teamId = currUser.teamId ? currUser.teamId : null;
  let game
  if (teamId) {
    game = Game.findOrCreate({ where: { teamId, weekNum: _weekNum }})
      .then(_game => res.send(_game))
      .catch(next)
  }
  else {
    game = Game.findOrCreate({ where: { userId: authId, weekNum: _weekNum }})
      .then(_game => res.send(_game))
      .catch(next)
  }
})


// edit game
router.put('/:id', (req, res, next) => {
  Game.findByPk(req.params.id)
    .then(game => {
      if (!game) {
        res.status(404).send('Game Not Found')
      }
      else {
        return game.update(req.body)
      }
    })
    .then(game => {
      res.send(game);
    })
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
