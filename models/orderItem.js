const Sequelize =require('sequelize');
const sequelize = require('../util/database');


const orderItem = sequelize.define('orderItem',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    quantity:Sequelize.INTEGER
    
});

module.exports = orderItem;