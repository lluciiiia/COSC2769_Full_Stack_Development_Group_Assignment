import express from 'express';
import { createAdmin } from '../services/adminServices';


const router= express.Router();

router.post('/', async(req,res) =>{
    try{
        const result= await createAdmin(req.body);
        res.status(200).json({ message: result.message, user: result.admin });
    }catch(error){
        console.error("Error in /register route:", error);
        res.status(500).json({ message: "Server error" });
    }
})


export default router;