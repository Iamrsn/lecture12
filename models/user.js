const mongoose=require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const UserSchema=mongoose.Schema({
    image:"string",
    email:"string",
    name:"string"
})

module.exports=mongoose.model("user",UserSchema);