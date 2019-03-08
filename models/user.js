const Sequelize = require('sequelize');
const sequelize  =require('../util/database');
const user = sequelize.define('user',{
  id:{
      type:Sequelize.INTEGER,
      primaryKey:true, 
      autoIncrement:true   
  },
  name:{
      type:Sequelize.STRING
  },
  email:{
      type:Sequelize.STRING
  }
});

module.exports = user;