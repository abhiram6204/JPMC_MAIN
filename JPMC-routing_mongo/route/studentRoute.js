const express=require("express")
const studentModel=require("../model/studentModel")
const app=express()
const routes=express.Router()
routes.get("/",async (req,res)=>{
    const student=await studentModel.find()
    res.json(student)
})
routes.get("/:id",async(req,res)=>{

        const {id}=req.params
        const student=await studentModel.findById(id)
        if(!student)
            res.send("data not found")
        else
            res.json(student)
})
routes.post("/",async(req,res)=>{
    try{
        const student=await studentModel.create({
            _id:req.body._id,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email
        })
        res.send(student)
    }
    catch{
        res.send("error data already exists")
    }
})
routes.put("/:id",async(req,res)=>{
        const {id}=req.params
        const student=await studentModel.findByIdAndUpdate(id,{
            _id:id,
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email
            })
        const update=await studentModel.findById(id)
        if(!update)
            res.send("update failed")
        else
            res.json(update)
})
routes.delete("/:id",async (req,res)=>{
        const {id}=req.params
        const student=await studentModel.findByIdAndDelete(id)
        if(!student)
            res.send("delete failed")
        else
            res.json(student)
})
module.exports=routes