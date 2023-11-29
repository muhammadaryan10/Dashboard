const express = require('express');
const mongoose = require('mongoose');
const app=express();
const cors = require('cors');

app.use(express.json());
// Use the cors middlewar
app.use(cors());
const userRoute=require("./routes/routes");

mongoose.connect('mongodb+srv://Dashboard:Dashboard@cluster0.n6cp7rn.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log("Sucess")
}).catch((err)=>console.log("error",err))

app.listen(5000);
app.use(userRoute)