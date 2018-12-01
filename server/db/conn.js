const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL, { logging: true });


module.exports = conn;
