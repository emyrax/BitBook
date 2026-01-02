import jwt from "jsonwebtoken"
import User from "../models/users.js"
import dotenv from "dotenv/config"
 
 const protectedRoute =async(req,res,next)=>{
   try {
     const token = req.header("Authorization").replace('Bearer', '')
   if(!token){
     return res.status(401).json({ "message": " Not Authorized "})
   }
   const decodeId = jwt.verify(token ,process.env.JWTSECRET)
 
 if(!decodeId){
   return res.status(401).json({ "message": " Invalid Authorization"})
   req.user = User.findById(decodeId.userId).select('-password')
   
   next()
   } 
     
   } catch (err) {
     console.error('user.middleware Error:', err);
     return res.status(401).json({ "message": " Null Authorization" })
   }
 }
 
 export default protectedRoute
 