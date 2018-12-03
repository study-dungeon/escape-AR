const conn = require('./conn');
const moment = require('moment');

const Game = conn.define('game', {
  
  weekNum: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 1
  },

  startTime: {
    type: conn.Sequelize.DATE,
    defaultValue: moment(),
    validate: {
      notEmpty: true
    }
  },

  endTime: {
    type: conn.Sequelize.DATE
  },

  escaped: {
    type: conn.Sequelize.BOOLEAN,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: false
  }

})


module.exports = Game;
