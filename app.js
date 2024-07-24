const express=require('express');
const path=require('path');
const UserModel=require("./models/user");
const app=express();


app.set("view engine","ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',function(req,res){
    res.render("index");
})

app.get('/delete/:id',async (req,res)=>{
    let users=await UserModel.findOneAndDelete({_id:req.params.id})
    res.redirect("/read");
})

app.get('/read',async (req,res)=>{
   let users = await UserModel.find()
    res.render("read",{users});
})

app.get('/edit/:userid',async (req,res)=>{
   let user=await UserModel.findOne({_id:req.params.userid});
   res.render("edit",{user})
 })

 app.post('/update/:userid',async (req,res)=>{
    let {name,email,image}=req.body;
    let user=await UserModel.findOneAndUpdate({_id:req.params.userid},{name,email,image},{new:true});
    res.redirect("/read")
  })

app.post('/create',async (req,res)=>{
    let{name,email,image}=req.body;
    let createdUser= await UserModel.create({
        name,
        email,
        image
    })
    res.redirect("/read");
})

app.listen(3000)