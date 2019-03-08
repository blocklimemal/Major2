const Sequelize = require('sequelize');
const sequelize  = require('../util/database');
const cart = sequelize.define('cart',{
          id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true

          }
});

module.exports = cart;
