const conn = require('./conn');



const Game = conn.define('game', {
  
  weekNum: {
    type: conn.Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  startTime: {
    type: conn.Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  endTime: {
    type: conn.Sequelize.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
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
