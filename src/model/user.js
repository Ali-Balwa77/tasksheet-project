const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        // match:[/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, 'Please fill a valid Password']
    },
    
})
const userModel = new mongoose.model('userdata',userSchema)
module.exports = userModel