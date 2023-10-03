import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const app=express();
const PORT=process.env.PORT || 8000;
import mongoose from 'mongoose';
import connectDB from './config/connectDB.js';
import catRoutes from './routes/catRoutes.js';
connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine','ejs');

app.use('/',catRoutes)

mongoose.connection.once('open',()=>{
    console.log("Connect to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on Port: ${PORT}`);
    });
})