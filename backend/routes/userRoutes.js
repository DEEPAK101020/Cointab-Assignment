const express = require("express")
const {user} = require("../models/user.model")
const UserRouter = express.Router();
const axios = require("axios")

UserRouter.post("/",async (req,res)=>{
    try {
        let {id,name,email,city,phone,website,company} = req.body
        const newuser = await user.create({
            id:id,
            name:name,
            email:email,
            city:city,
            phone:phone,
            website:website,
            company:company,  
        })

        res.status(201).json(newuser)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:error})
    }
})

UserRouter.get("/",async (req,res)=>{
    try {
        let response = await axios("https://jsonplaceholder.typicode.com/users")
        let jsonData = response.data;
        let userData = await user.findAll({attributes:['id']});
        
        userData = userData.map(item => item.id)
        jsonData = jsonData.map(item => {
            if(userData.includes(item.id)){
                item.presentInSQL = true;
            }
            else{
                item.presentInSQL = false;
            }
            return item;
        })
       
        res.status(200).json(jsonData);
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error})
    }
})

module.exports = {UserRouter}