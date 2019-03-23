const Sequelize  = require('sequelize');

const sequelize  = new Sequelize('node_complete','root','test',{
    dialect:'mysql',
    host :'localhost'

});

module.exports = sequelize;