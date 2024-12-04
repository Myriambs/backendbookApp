const express = require('express')
const userRoute = express.Router()
const User= require('../model/AuthModel')
const Feedback = require('../model/FeedBAck')
const {registerValidation,validation,loginValidation} = require('../middelware/RegisterValidation')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isAuth}=require('../middelware/isAuth')



userRoute.post('/register',registerValidation,validation,async(req,res)=>{
    try{
    const {email,userName,password}= req.body
    const foundAuth = await User.findOne({email})
    if(foundAuth) {return res.status(404).json({msg:" el email deja mawjoud bara logi 3ych khouya ou okhty"})}
    const newAuth = await new User(req.body)
    //bcrypt 
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    newAuth.password = hash 
    newAuth.save()
    res.status(200).json({msg:'welcome to ur note pad',newAuth})
    }catch(err){
        console.log(err)
        res.send(err.message)
    }
    })
    //=>http://localhost:5002/auth/login
    
userRoute.post('/login', loginValidation,validation,async (req, res) => {
        try {
          const { email, password } = req.body;
          const foundAuth = await User.findOne({ email });
          if (!foundAuth) {
            return res.status(404).json({ msg: "rak mkch msejel, bara register 3aych khouya ou okhty" });
          }
      
          // Comparer le mot de passe fourni avec le mot de passe stocké
          const match = await bcrypt.compare(password, foundAuth.password);
          if (!match) {
            return res.status(404).json({ msg: "rak ghalit fil mdsp mte3ik" });
          }
          // Création du token avec le payload
          const payload = { id: foundAuth._id };
          const token = jwt.sign(payload, process.env.privateKey);
          res.status(200).json({ msg: "ur welcome, ya mar7abe", token, foundAuth });
        } catch (err) {
          console.log(err);
          res.send(err.message)

          res.status(500).json({ msg: "Something went wrong, please try again." });
        }
      });
    //route get profil view profil 
    //http://localhost:5002/auth/myaccount
    
userRoute.get('/myaccount',isAuth,(req,res)=>{
      try{
    res.send(req.user)
      } catch(err){ console.log(err)}})

// ajout library 
//http://localhost:5000/user/library/67483dc1f73ac954874998c9

userRoute.post('/:id/library/:bookId',async(req,res)=>{
    try{
        //id mte3 el user 
const{id}=req.params
//id du livre 
const{bookId} = req.params
const user = await User.findById(id)
user.library.push(bookId)
await user.save()
const newBookLibrary = user.library
res.status(200).json({msg:'book added to ur user library', newBookLibrary,user})
}catch(err){
 res.status(500).json({ error: err.message });
}
})
//creation d'un user 
userRoute.post('/adduser',async(req,res)=>{
    try{
const newUSer = await User.create(req.body)
res.status(200).json({msg:"new user",newUSer})

}catch(err){
        console.log(err)
    }
})


//partie feedback 
//http://localhost:5000/user/67483e5af73ac954874998cc/addfeedback/67483dc1f73ac954874998c9
userRoute.post('/:id/addfeedback/:bookId',async(req,res)=>{
    try{
const {id}=req.params
const {bookId}=req.params

const feedback = await Feedback.create({
    userId:id,
    bookId,
    ...req.body
})

res.status(200).json({msg:"la creation du feedback done",feedback})




    }catch(err){
        res.status(500).json({ error: err.message });

    }
})
userRoute.patch('/:idFeed',async(req,res)=>{
    try{

const {idFeed} = req.params ;
const {note} = req.body;
console.log("note",note,idFeed)
const foundFeedback = await Feedback.findById(idFeed)

if(!foundFeedback){ return res.status(404).json({msg:'Feedback not found'})}
console.log(foundFeedback)
foundFeedback.note = note 
console.log(foundFeedback)
const updatedFeedback = await foundFeedback.save()
console.log(updatedFeedback)

res.status(200).json({msg:'voici la version updated', updatedFeedback})
    }catch(err){
        res.status(500).json({ error: err.message });

    }
})
userRoute.delete('/:idFeed',async(req,res)=>{
    try{

const {idFeed}=req.params
await Feedback.findByIdAndDelete(idFeed)
res.status(200).json({msg:'Feedback deleted'})
    }catch(err){
        res.status(500).json({ error: err.message });

    }
})
userRoute.get('/:id',async(req,res)=>{
    try{
const {id}=req.params
const feedback = await Feedback.findById(id)
.populate('userId','userName')
.populate('bookId','titre author')
if(!feedback){
    return res.status(404).json({msg:" feedback partie populate not found"})
}
res.json(feedback)

    }catch(err){
        res.status(500).json({ error: err.message });

    }
})



module.exports = userRoute