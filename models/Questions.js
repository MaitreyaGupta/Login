const mongoose=require("mongoose")

const questionSchema=new mongoose.Schema({
    Question:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    }
},
{
    timestamps:true,
})


const Question=new mongoose.model("Question",questionSchema)

module.exports=Question