const express = require("express")
const cors = require("cors");
const sequelize = require("./db");
const {UserRouter}=require("./routes/userRoutes");
const { PostRoute } = require("./routes/postRoutes");

const app = express();
app.use(cors())
app.use(express.json())

app.use("/user",UserRouter)
app.use("/post",PostRoute)
app.get("/",(req,res)=>{
    res.send("Home")
})



app.listen(3000,async()=>{
    try {
        await sequelize.authenticate();
        console.log("connected to SQL DB")
        console.log("Server is running on port 3000")
    } catch (error) {
        console.log(error)
    }
    
})