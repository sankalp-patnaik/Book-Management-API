// require('dotenv).config({path: './env'})
import dotenv from "dotenv";
import express from "express"
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    const PORT=process.env.PORT || 8000;
    app.listen(PORT,()=>{
        console.log(`SERVER is running on PORT: ${PORT}`);
    })
})
.catch((error)=>{
    console.log("MONGO DB connection failed !!",error)
})









