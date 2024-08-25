import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
    console.log("GET /notifications hit");
    res.json({ message: 'List of notifications' });
  });
  
  router.post('/', (req, res) => {
    res.json({ message: 'nitifications created' });
  });
  
  router.delete('/', (req, res) => {
      console.log("DELETE /notifications hit");
    res.json({ message: 'notifications deleted' });
  });

  export default router;