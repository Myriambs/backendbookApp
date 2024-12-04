const mongoose = require('mongoose')

const db=async()=>{
    try{
    await  mongoose.connect('mongodb+srv://bensalahmeriem0:mwo8LxccgItqTNEZ@cluster0.fwzig.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  console.log('MongoDB Connected');    }catch(err){
    
        console.log(err)
    }
}

module.exports = db