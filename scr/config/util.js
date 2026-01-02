import jwt from "jsonwebtoken"
import dotenv from "dotenv/config"
//dotenv.config({path:'../../.env'})

 const generateToken=async(user)=>{
   return jwt.sign(user, process.env.JWTSECRET||"mysedrxrxdzzzd",{expiresIn:"15d"})
 }
 export default generateToken;