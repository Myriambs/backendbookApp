const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    userName:{
        type:String, required:true
    },
    email:{type:String,unique:true},
    role:{type:String, enum:['Admin',"User"],default:'User'},
    password:{type:String,required:true},
    library:[{type:mongoose.Schema.Types.ObjectId, ref:'Book'}]
})

module.exports = mongoose.model('User',userSchema)