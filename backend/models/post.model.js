const {DataTypes} = require("sequelize")
const sequelize = require("../db")

const postmodel = sequelize.define("post", {
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
},{
    timestamps:false
})

module.exports = {
    postmodel
}