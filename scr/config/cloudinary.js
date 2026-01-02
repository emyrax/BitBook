import dotenv from  "dotenv/config"
import {v2 as cloudinary} from "cloudinary"
//dotenv.config({ path: '../../.env' })
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// const uploadImg = async (filePath)=>{
//   try {
//     const result = await cloud.uploader.upload(filePath)
//   return result.secure_url
//   } catch (err) {
//     console.error(' CLOUDINARY Error:', err);
    
//   }
// }

export default cloudinary