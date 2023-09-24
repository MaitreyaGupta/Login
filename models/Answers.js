const mongoose=require("mongoose")

const answeSchema=new mongoose.Schema({
    Answer:{
        type:String,
        unique:true
    }
})

var Answer=new mongoose.model("Answer",answeSchema)

module.exports=Answer