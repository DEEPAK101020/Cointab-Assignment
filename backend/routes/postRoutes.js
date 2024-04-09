const express = require("express")
const {postmodel} = require("../models/post.model")
const PostRoute = express.Router();
const axios = require("axios")

PostRoute.post("/",async(req,res)=>{
    try {
        
        let posts = await postmodel.bulkCreate(req.body);
        
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: "error creating post"});
    }
})

PostRoute.get("/",async(req,res)=>{
    try {
        let {userId} = req.query;
        let posts = await postmodel.findAll({where: {userId:userId}});
        let response = await axios(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        response = response.data
        if(posts.length != 0){
             res.status(200).json({msg:"added",response})
        }else{

             res.status(200).json({msg:"unable to add data internal server error",response});
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:"error while getting posts"})
    }
})

module.exports={
    PostRoute
}