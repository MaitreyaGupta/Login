const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://maitreyaguptaa:killerman@devs.syeiknh.mongodb.net/ab",{useNewUrlParser:true,useUnifiedTopology:true})


const db=mongoose.connection


db.once("open",function(err){
    if(err)
    {
        console.log(err)
    }
    else
    {
    console.log("Connected to database")
    }
}
)

module.exports=db;
