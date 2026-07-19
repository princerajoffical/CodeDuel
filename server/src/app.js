const express =require('express');
const cors=require('cors');
const app=express();
const authRoutes=require("./routes/authRoutes");


//Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/room', require('./routes/roomRoutes'));
app.use('/api/judge', require('./routes/judgeRoutes'));
//Test route
app.get('/',(req,res)=>{
    res.send("server is running");
})
module.exports=app;
