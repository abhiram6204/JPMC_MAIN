const mongoose=require('mongoose')
const studentSchema=mongoose.Schema({
    _id:{type:Number,required:true,default:999},
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:Number,required:true}
})
const StudentModel=mongoose.model('student',studentSchema)
module.exports=StudentModel