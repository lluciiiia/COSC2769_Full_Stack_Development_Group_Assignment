import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePictureURL: String,
  introduction: String,
  address: String,
  age: Number,
  phoneNumber: String,
  activeStatus: Boolean,
  education:  String,
  location: String,
  relationship: String,
  job: String,
  jobDescription: String,
  degree: String,
  years: String,
  educationDescription: String,
  inRelationship: String,
  bio:String,
  friends:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
