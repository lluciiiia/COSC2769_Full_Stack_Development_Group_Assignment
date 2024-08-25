import express from "express";
import Notifications from "../models/notification";
const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const noti= await Notifications.find();
        res.json(noti);
    }catch(error){
        console.error("Error fetching posts", error);
        res.status(500).json({error: 'Falied to fetch posts'});
    }
  });
  
  router.post('/',async (req, res) => {
    try {
        const newNoti = new Notifications(req.body);  
        console.log(newNoti);
        await newNoti.save();  
        res.status(201).json({ message: 'notification created', noti: newNoti });
      } catch (error: any) {
        console.error("Error creating notification:", error);

        if (error.name === 'ValidationError') {
          return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'Failed to create notification' });
      }
  });
  
  router.delete('/:id', async (req, res) => {
    try {
      const notiId = req.params.id;
      await Notifications.findByIdAndDelete(notiId);  
      res.json({ message: 'Notification deleted' });
    } catch (error) {
      console.error("Error deleting notification:", error);
      res.status(500).json({ error: 'Failed to delete notification' });
    }
  });

  export default router;