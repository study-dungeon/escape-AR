const conn = require('./conn');

const Images = conn.define('image', {

  image: {
    type: conn.Sequelize.STRING,
    allowNull: false
  }

})



module.exports = Images;
