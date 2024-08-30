
import mongoose from "mongoose";


const PhotoSchema = new mongoose.Schema(
{
  image:String
},
{
  collection:"Photo",
}
);
 

const Photo = mongoose.model('Photo', PhotoSchema);
export default Photo;