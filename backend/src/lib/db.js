import mongoose from "mongoose";

export const connectDB =  async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo connection :${connectDB.connection.host} `);
    } catch (error){
        console.log(error);
        process.exit(1);  //failure  code
    }
}