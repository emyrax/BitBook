import express from "express"
import User from "../models/users.js"
import generateToken from "../config/util.js"
 const router = express.Router()
 router.use(express.json())
router.post("/register", async (req,res) =>{
  try {
    console.log("hitted")
    const {email,username,password}= await req.body
    if(!email || !username || !password){
      return res.status(400).json({"message":"All input are required , Kindly fill all input"})  
    }
    console.log(username.length)
   if(username.length < 3){
      return res.status(400).json({ "message":" username must exceed 3 characters"})
    }
   if(password.length < 8){
      return res.status(400).json({"message":"Password length  must exceed 8 characters" })
    } 
    const emailExist=await User.findOne({email})
    if(emailExist){
      return res.status(400).json({"message":"Email already exist" })
    }
    const usernameExist=await User.findOne({username})
    if(emailExist){
      return res.status(400).json({"message":" Username  already exist" })
    }
    
    const profileImage = `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`
    const user= await new User({
      "email":email,
     "username":username,
     "password":password,
     "profileImage":profileImage,
    })
     user.save()
     const token = await generateToken({ "userId":user._id})
     res.status(201).json(
       { 
       "token": token,
       "userId":user._id,
       "username": user.username,
       "email":user.email
       //"createAt":user.createdAt
        })

     
      
    
} 
catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ "message":`Server Error ${err} ` })
  }
  

})

// login user
router.post("/login", async (req,res) =>{
  try {
    //Get req datas
    const { email, password } = await req.body
    console.log(email,password)
    // Avoid empty field
    if(!email || !password){
      return res.status(400).json({"message":"All fields are required "})
    }
    const user=await User.findOne({email})
    if(!user){
      return res.status(400).json({
        "message":"Invalid Credential"
      })
    }
  const isMatch = await user.comparePassword(password)
  if(!isMatch){
    return res.status(400).json({
        "message":"Invalid Credential"
      })
  }
  const token = await generateToken({ "userId":user._id})
     res.status(201).json(
       { 
       "token": token,
       "id":user._id,
       "username": user.username,
       "email":user.email
       //"createAt":user.createdAt
        })
    
  } 
  catch (err) {
    
    console.error('Error:', err);
    return res.status(500).json({"message":err})
  }
  


})
export default router