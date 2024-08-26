import express from "express"
import { regisNewAccount } from "../services/authenServices";


const router= express.Router();


router.post("/register", async(req,res) =>{
    try{
        const result= await regisNewAccount(req.body);

        res.status(result.status).json({ message: result.message });
    }catch(error){
        console.error("Error in /register route:", error);
        res.status(500).json({ message: 'Server error' });

    }
})

export default router;