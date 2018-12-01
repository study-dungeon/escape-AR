const conn = require('./conn');



const User = conn.define('user', {

  id: {
    type: conn.Sequelize.UUID,
    defaultValue: conn.Sequelize.UUIDV4,
    primaryKey: true
  },

  username: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },

  email: {
    type: conn.Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  
  password: {
    type: conn.Sequelize.STRING,
    allowNull: false
  },
  
})




module.exports = User;
