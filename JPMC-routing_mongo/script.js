require('dotenv').config()
const express=require('express')
const app=express()
const port=process.env.port
const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost:27017/studentDB_JPMC")
.then(()=>console.log("connection successful"))


const studentRoutes=require("./route/studentRoute")
app.use(express.json())
app.use(studentRoutes)
app.use(express.urlencoded({extended:true}))
app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})