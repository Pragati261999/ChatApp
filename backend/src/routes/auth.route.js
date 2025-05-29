import express from "express";

const router = express.Routers();


router.get("/signup", (req, res)=>{
    res.send("signup Routes");
})

export default router;