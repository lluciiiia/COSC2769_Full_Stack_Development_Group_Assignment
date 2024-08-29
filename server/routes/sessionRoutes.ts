import express from 'express';



const router = express.Router();

router.get("/", async (req, res) =>{
    try{
        const isAuthenticated= req.session.user.isAuthenticated;

        if(!isAuthenticated){
            res.status(500).json({message: "Server erro"});
        }

        res.status(200).json(isAuthenticated);
    }catch(error){
        throw new Error("Error fetched authen");
    }
})

export default router;