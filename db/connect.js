import mongoose from "mongoose"
const connectDB = (url)=>  mongoose.connect(process.env.DB)
export default connectDB;