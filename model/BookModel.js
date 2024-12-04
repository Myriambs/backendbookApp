const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({

titre:{
    type:String,
    required: [true, 'Book title is required'],
    maxlength: [50, 'Book title cannot exceed 50 characters'],
    unique: true,
    trim: true
} , 
image:{
    type:String,
    default:'https://www.mjc-castanet-tolosan.fr/wp-content/uploads/2016/06/Pas-dimage-disponible1-e1466657277567.jpg'
},
author: { type: String, required: [true, 'Book author is required'],
    maxlength: [20, 'Book author cannot exceed 20 characters'],
    trim: true },
genre: { type: String },
})

module.exports = mongoose.model('Book',bookSchema)