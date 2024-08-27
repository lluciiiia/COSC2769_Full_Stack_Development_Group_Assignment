import mongoose from "mongoose";

const PhotoSchema = new mongoose.Schema({
  filePath: { 
    type: String, 
    required: true 
  },
  fileName: { 
    type: String, 
    required: true 
  },
  fileSize: { 
    type: Number, 
    required: true 
  }
});

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;
