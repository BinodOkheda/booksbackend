// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());

const {BookRouter} = require("./routes/books.route")

app.use("/",BookRouter)






// Connect to MongoDB
app.listen(process.env.port,async()=>{
    try {
     await mongoose.connect(process.env.mongoURL)
     console.log("connected to DB")
     
    } catch (error) {
      
       console.log(error.message)
    }
 
    console.log(`server is running at ${process.env.port}`)
 })
