const {Sequelize} = require("sequelize")
require("dotenv").config()

const sequelize = new Sequelize({
    username:process.env.MYSQL_USERNAME,
    password:process.env.MYSQL_PASSWORD,
    database:process.env.MYSQL_DATABASE,
    host:process.env.MYSQL_HOST,
    port:process.env.MYSQL_PORT,
    
    dialect:"mysql"
})

module.exports = sequelize;