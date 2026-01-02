import mongoose from "mongoose"
const bookSchema = new mongoose.Schema({
  title:{
    type:String,
    required: true
  },
  caption:{
    type:String,
    required:true
  },
  rate:{
    type:Number,
    required:true,
    max:5,
    min:0,
  },
  image:{
    type:String,
    required:true,
    
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  }
  
},{timestamps:true});

const Books = mongoose.model("Books",bookSchema)
export default Books