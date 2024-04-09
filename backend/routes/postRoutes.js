const express = require("express")
const {postmodel} = require("../models/post.model")
const PostRoute = express.Router();
const axios = require("axios")
const excel = require('exceljs');
const stream = require("stream");


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

PostRoute.get('/download/:userId', async (req, res) => {
    const {userId} = req.params;
    try {
      const data = await postmodel.findAll({where:{userId: userId}});
  
      const workbook = new excel.Workbook();
      const addingWorksheet = workbook.addWorksheet('post');
      addingWorksheet.columns = [
        { header:  'UserId',key:'userId',width: 10},
        { header: "Postid",key:"id",width: 10},
        { header: 'Title', key: 'title', width: 60 },
        { header: 'Body', key: 'body', width: 80 },

      ];
  
      data.forEach((post) => {
        addingWorksheet.addRow({userId:post.userId, id:post.id, title: post.title, body: post.body });
      });
  
      const bufferStream = new stream.PassThrough();
      workbook.xlsx.write(bufferStream).then(() => {
      bufferStream.end();
    });
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=posts_${userId}.xlsx`);
  
      bufferStream.pipe(res);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, error: 'Error generating file' });
    }
  });

module.exports={
    PostRoute
}