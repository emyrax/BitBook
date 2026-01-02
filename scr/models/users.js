import mongoose from "mongoose"
import bcrypt from "bcryptjs"
//userShemas
const userShema =new mongoose.Schema({
  username : {
    type:String,
    unique: true,
    required:true,
    trim:true,
    minLength:3
  },
  email:{
    type:String,
    required:true,
    unique:true,
    match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    
  },
  password:{
    type:String,
    required:true,
    minLength:8
  }, 
  
  profileImage:{
    type : String,
    required:true,
    default: ""
  }
},{timestamps:true})

userShema.pre('save', async function (){
  if(!this.isModified("password")){
    
  }
  try {
    const salt= await bcrypt.genSalt(10);
   this.password= await bcrypt.hash(this.password,salt);
    ;
    
  
  } catch (err) {
    console.error('Error:', err);
    
    console.log(err)
    throw err
  }
  
})
userShema.methods.comparePassword= async function(input_password){
  return bcrypt.compare(input_password,this.password)
}

 
const User=mongoose.model("User",userShema)
export default User;