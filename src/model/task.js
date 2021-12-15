const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    taskHeadername:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    date:{
        type: String, 
        default: Date.now
    },
    userId:{
        type:String
    }
}) 
const taskModel = new mongoose.model('taskdata',taskSchema)
module.exports = taskModel