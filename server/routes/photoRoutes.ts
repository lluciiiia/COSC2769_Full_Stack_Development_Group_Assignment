// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import Photo from '../models/photo';
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const router = express.Router();

// // Define the route for uploading images
// router.post('/upload/image', upload.single('image'), async (req: Request, res: Response) => {
//     if (req.file) {
//         // Convert image buffer to Base64
//         console.log('Uploading image');
//         const base64Image = req.file.buffer.toString('base64');

//         // Create a new Photo document
//         const newPhoto = new Photo({
//             image: base64Image, // Store the Base64 image string
//         });

//         try {
//             // Save the photo to the database
//             const savedPhoto = await newPhoto.save();
//             console.log('Image saved to database:', savedPhoto);

//             // Respond with success and the saved image data
//             return res.json({ success: true, image: savedPhoto.image });
//         } catch (error) {
//             console.error('Error saving image to database:', error);
//             return res.status(500).json({ success: false, message: 'Error saving image to database.' });
//         }
//     }

//     return res.status(400).json({ success: false, message: 'No image uploaded.' });
// });

// router.get('/image/:id', async (req: Request, res: Response) => {
//     try {
//         const photoId = req.params.id;

//         // Find the photo by ID
//         const photo = await Photo.findById(photoId);

//         if (!photo) {
//             return res.status(404).json({ success: false, message: 'Image not found.' });
//         }

//         res.json(photo)
//     } catch (error) {
//         console.error('Error retrieving image:', error);
//         return res.status(500).json({ success: false, message: 'Error retrieving image.' });
//     }
// });