 const express=require("express")
const app=express() 
const bodyparser=require("body-parser")
const mongodb=require("./config/mongoose")
const User=require("./models/user")
const Questions=require("./models/Questions")
const Question = require("./models/Questions")
const Answer=require("./models/Answers")
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static("public"))
app.set("view engine","ejs")
 
//const expressLayouts=require("./views/ExpressLayouts")
//app.use(expressLayouts)
const port=process.env.PORT||3030


app.listen(port,function(req,res){
    console.log("Listening")
})

app.get("/",function(req,res){
    res.render("user_sign_in")
})
app.get("/signup",function(req,res){
    res.render("user_sign_up")
})

app.post("/",async function(req,res){
const data={
        email:req.body.email,
        password:req.body.password,
    }
    const check=await User.findOne({email:req.body.email})
    const check1=await User.findOne({password:req.body.password})
    if(check==null && check1==null)
    {
        User.insertMany([data])
        res.redirect("/")
    }
    else{
        res.send("Duplicate name or password")
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
    catch{
        res.send("Wrong details")
    }
})

app.get("/Index",function(req,res){
    res.render("Index")
})

 
app.post("/Question",async function(req,res){
    const data1={
        name:req.body.name,
        Question:req.body.Question,
    }
    Questions.insertMany([data1])
    res.redirect("Answers")
})

app.post("/Answers",async function(req,res){
    const data2={
        Answer:req.body.Answer, 
    }
    if(data2.Answer==null)
    {
        res.redirect("Answers")
    }
    else{
    Answer.insertMany([data2])
    res.redirect("Answers")
    }
})
app.get("/Answers",async function(req,res){
    var data1=await Questions.find() 
    var data2=await Answer.find()
    if(data2!=null){
    res.render("Answers",{
    Questions1:req.body.name,
    Questions2:req.body.Questions,
    practice:data1,
    practice1:data2,
    })
}
else{
    res.render("Answers",{
        Questions1:req.body.name,
        Questions2:req.body.Questions,
        practice:data1,
        })
}
})
