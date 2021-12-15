const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/tsdb')
.then(()=>console.log('db connection successfuly..'))
.catch((err)=>console.log(err))