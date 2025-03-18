import express from 'express';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser'
import { app,server } from './lib/socket.js';
import path from 'path'
dotenv.config()



app.use(express.json({ limit: '10mb' }));  // Set higher limit for Base64 images
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
}))

app.use('/api/auth',authRoutes);
app.use('/api/messages',messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()
server.listen(5001,()=>{
    console.log(`server running on ${PORT}`)
    connectDB()
})