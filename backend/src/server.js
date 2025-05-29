import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route"
dotenv.config();
const app = express()
const PORT = process.env.PORT
// app.get("/",(req, res)=>{
//     res.send("Hello world");
// })
app.use('/api/auth', authRoutes);

app.listen(PORT, ()=>{
    console.log(`Server is running on this port ${PORT} `);
})