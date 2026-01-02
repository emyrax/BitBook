import express from "express"
import cloudinary from "../config/cloudinary.js"
import Book from "../models/books.js"
import protectedRoute from "../middleware/user.middleware.js"
const router= express.Router()
router.post("/" , protectedRoute, async (req , res )=>{
  try {
    const { title , caption, rate, image }= req.body
    if (!title || !caption || !rate || !image){
    return res.status(400).json({ "message": " All field are required "})
    //uploader
    const ImageUrl= cloudinary.uploader.upload(image)
    
    const newBook =  await new Book({
        "title": title,
        "caption": caption,
        "rate":rate,
        "image": ImageUrl.secure_url,
        "user":req.user._id
        }
      )
      await newBook.save()
      res.status(200).json(newBook)
  }
  } catch (err) {
    console.error('Book Route Error:', err);
    res.status(500).json({ message: err.message });
    
  }
  
}),
router.get("/", protectedRoute , async ( req, res )=>{
  // get latest All post 
  try {
    const page = await req.query.page || 1;
  const limit = await req.query.limit || 5;
  const skip = (page - 1)*limit
  const book =await  Book.find()
  .sort({createdAt: -1})
  .skip(skip)
  .limit(limit)
  .populate( "user", "username profileImage")
  const totalBooks = await Book.countDocuments();
  
  res.send(
    book,
    page,
    totalBooks,
    totalPage:Math.ceil(totalBooks/limit)
    )
  } 
  
  catch (err) {
    console.error('Error in Getting All Books :', err);
     console.log("Error creating book", err);
    res.status(500).json({ message: err.message });
    
  }
})
router.delete("/:id" , protectedRoute, async (req ,res)=> {
 try {
    const bookId = req.parmas.id
  const book = Book.findById(bookId)
  if(!book){
    return res.status(404).json("message" : " 404  Book not found")
  if(book.user.toString()!==res.user._id.toString()){
    return res.status(401).json({
      "message":" Not Authorized Action by User"
    })
    // deleting image from cloudinary
    if(book.image && book.image.includes("cloudinary") ){
      try {
        const publicId= await book.image.split("/").pop().split(".")[0]
     await cloudinary.uploader.destory(publicId)
      } catch (err) {
        console.error('Error:', err);
        
      }
    }
   await book.deleteOne()
    res.status(200).json({"message" :" Sucessfully Deleted"})
  }
  
 } catch (err) {
   console.error('Error In Deleting A Book:', err);
   
 }
  }
  
})
router.get("/user" ,protectedRoute , async (req, res)=>{
  try {
    const book = Book.find({user:req.user._id}).sort({createdAt:-1})
    if(!book){
      return res.status(404).json({ "message":"No Book found"})
    }
  res.status(200).json(book)
  
  } catch (error) {
    console.error(error);
        res.status(500).json({ message: "Internal server error" });
  }
})
export default router