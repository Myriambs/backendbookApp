const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:"Book",required:true},
    note:{type:String}
})

module.exports = mongoose.model('Feedback',feedbackSchema)