const {DataTypes} = require("sequelize")
const sequelize = require("../db")

const post = sequelize.define("Post", {
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
    },
    userId:{
        type:DataTypes.INTEGER,
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    body:{
        type:DataTypes.TEXT
    }
})

module.exports = {
    post
}