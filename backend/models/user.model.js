const {DataTypes} = require("sequelize")
const sequelize = require("../db")

const user = sequelize.define('User', {
    id:{
        type:DataTypes.NUMBER,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    city:{
        type:DataTypes.STRING,
    },
    phone:{
        type:DataTypes.STRING,
        allowNull:false
    },
    website:{
        type:DataTypes.STRING,
    },
    company:{
        type:DataTypes.STRING,
    }
   
},{
    timestamps:false,
})

module.exports={
    user
}