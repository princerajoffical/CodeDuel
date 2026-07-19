const express =require('express');
const cors=require('cors');
const app=express();
const authRoutes=require("./routes/authRoutes");


//Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/room', require('./routes/roomRoutes'));
app.use('/room', require('./routes/roomRoutes'));

app.use('/api/judge', require('./routes/judgeRoutes'));
app.use('/judge', require('./routes/judgeRoutes'));
app.get("/health-check-123", (req, res) => {
    res.json({
        success: true,
        message: "THIS IS MY LATEST CODE"
    });
});

module.exports=app;
