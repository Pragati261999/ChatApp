// import mongoose from "mongoose";

// export const connectDB =  async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL);
//         console.log(`Mongo connection :${connectDB.connection.host} `);
//     } catch (error){
//         console.log(error);
//         process.exit(1);  //failure  code
//     }
// }

import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI); // or MONGO_URI if you renamed it
    console.log(`MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
  