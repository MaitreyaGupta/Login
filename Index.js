const express=require("express")
const app=express() 
const bodyparser=require("body-parser")
const User=require("./models/user")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")
 var mongoose=require("mongoose")

 async function ConnectDB()
 {
try{
mongoose.connect("mongodb://127.0.0.1:27017/starter",{useNewUrlParser:true},{useUnifiedTopology:true})
console.log("Connected")
}
catch(err){
    console.log("Cannot connect")
} 
}//const expressLayouts=require("./views/ExpressLayouts")
//app.use(expressLayouts)
const port=process.env.PORT||3030

app.listen(port,function(req,res){
    console.log("Listening")
    ConnectDB();
})

app.get("/",function(req,res){
    res.render("user_sign_in")
})
app.get("/signup",function(req,res){
    res.render("user_sign_up")
})

app.post("/",async function(req,res){
try{
const data={
        email:req.body.email,
        password:req.body.password,
    }
    const check=await User.findOne({email:req.body.email})
    const check1=await User.findOne({password:req.body.password})
    if(check==null && check1==null)
    {
        User.insertMany([data])
        res.render("user_sign_in")
    }
    else{
        res.send("Duplicate name or password")
    }
}
catch(err)
{
    res,send("Wrong information")
}
})

app.post("/signup",async function(req,res){
    try
    {
     const check=await User.findOne({email:req.body.email})
     if(check.password===req.body.password)
     {
        res.render("Index")
     }
     else
     {
        res.send("Wrong information")
     }
    }
    catch(err){
        res.send("Wrong details")
    }
})

app.get("/Index",function(req,res){
    res.render("Index")
})
