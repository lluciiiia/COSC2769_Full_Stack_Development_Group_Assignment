import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
    console.log("GET /groups hit")
    res.json({ message: 'List of groups' });
});


router.post('/', (req, res) => {
    res.json({ message: 'group created' });
  });
  
  router.delete('/', (req, res) => {
      console.log("DELETE group hit");
    res.json({ message: 'group deleted' });
  });

export default router;
