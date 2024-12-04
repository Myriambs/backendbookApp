
const Book = require('../model/BookModel')

exports.addBook=async (req, res) => {
    try {
      const newBook = await Book.create(req.body);
      res.status(201).json(newBook);
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err.message });
    }
  }


exports.lectureBook=async (req, res) => {
    try {
      const book = await Book.find();
      res.status(200).json({msg:'test',book});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

exports.updatedBook=async(req,res)=>{
    try{
    const {id}=req.params
    
    const updatedBook = await Book.findByIdAndUpdate(id, req.body,{new:true})
    res.status(200).json({msg:"voici le new book ",updatedBook})
    }catch(err){
      res.status(500).json({ error: err.message });
    
    }
      }


exports.removeBook=async(req,res)=>{
        try{
          const {id}=req.params
      await Book.findByIdAndDelete(id)
      res.status(200).json({msg:'c bon tfesekh '})
        }catch(err){
          res.status(500).json({ error: err.message });
      
        }
      }

exports.uniqueBook=async(req,res)=>{
        try{
          const {id}=req.params
      const uniqueBook = await Book.findById(id)
      if (!uniqueBook) return res.status(404).json({msg:'book not found , wrong id'})
        res.status(200).json({uniqueBook})
        }catch(err){
          res.status(500).json({ error: err.message });
      
        }
      }