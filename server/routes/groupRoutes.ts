import express from 'express';
import Group from '../models/group';
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const groups= await Group.find();
        res.json(groups);
    }catch(error){
        console.error("Error fetching groups: ", error);
        res.status(500).json({error: 'Failed to fetch groups'});
    }
});


router.post('/', async (req, res) => {
    try{
        const newGroup= new Group(req.body);
        console.log(newGroup);
        await newGroup.save();
        res.status(201).json({ message: 'Group created', user: newGroup })
    }catch(error:any){
        console.error("Error creating group", error)

        if(error.name === 'ValidationError'){
            return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create group' });
    }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const groupId = req.params.id;
      await Group.findByIdAndDelete(groupId);  
      res.json({ message: 'Group deleted' });
    } catch (error) {
      console.error("Error deleting Group:", error);
      res.status(500).json({ error: 'Failed to delete group' });
    }
  });

export default router;
