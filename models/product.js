 const Sequelize  =require('sequelize');

 const sequelize = require('../util/database');

 const product = sequelize.define('product',{
   id:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     primaryKey :true
   },
   title:{
    type:Sequelize.STRING,
    allowNULL:false
  },
   price:{
     type:Sequelize.INTEGER,
     allowNULL:false
   },
  
   imageUrl:{
     type:Sequelize.STRING,
     allowNULL:false
   },
description:{
  type:Sequelize.STRING
}
 });

 module.exports =  product;