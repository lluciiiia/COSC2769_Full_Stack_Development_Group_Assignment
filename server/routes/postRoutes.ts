import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    console.log("GET /post hit");
    res.json({ message: 'List of post' });
  });
  
  router.post('/', (req, res) => {
    res.json({ message: 'post created' });
  });
  
  router.delete('/', (req, res) => {
      console.log("DELETE /post hit");
    res.json({ message: 'post deleted' });
  });

  export default router;