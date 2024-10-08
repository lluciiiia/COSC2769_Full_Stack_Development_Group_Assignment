import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePictureURL: String,
    backgroundPictureURL: String,
    introduction: String,
    address: String,
    age: Number,
    phoneNumber: String,
    activeStatus: Boolean,
    education: String,
    location: String,
    relationship: String,
    job: String,
    jobDescription: String,
    degree: String,
    years: String,
    isAdmin: { type: Boolean, default: false },
    inRelationship: String,
    bio: String,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
