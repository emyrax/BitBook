import express from  "express"
import dotenv from  "dotenv/config"
import users from "./models/users.js"
import authRoutes from "./routers/authRoutes.js"
import bookRoutes from "./routers/booksRoute.js"
import mongoose from 'mongoose';
import connectDB from './config/db.js'
import cors from "cors"

const app = express()
const PORT = process.env.PORT ||3000
connectDB()
app.use(cors())
app.use("/api/auth/",authRoutes)
app.use("/api/books/",bookRoutes)

app.listen(PORT , ()=>{
  console.log(`listening... to ${PORT}`)
})