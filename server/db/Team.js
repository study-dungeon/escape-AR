const conn = require('./conn');



const Team = conn.define('team', {

  name: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  password: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  city: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  state: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  zip: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },

  escaped: {
    type: conn.Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }

})




module.exports = Team;
