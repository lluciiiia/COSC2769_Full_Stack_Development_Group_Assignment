import mongoose from "mongoose";

// Define the schema for the Group model
const groupSchema = new mongoose.Schema(
  {
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now },
    visibility: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
    },
    imageURL: String,
    backgroundImageURL: String,
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    description: { type: String },
    accepted: { type: Boolean, default: false },
  },
  { timestamps: true },
); // Automatically adds createdAt and updatedAt fields

// Create the model using the schema
const Group = mongoose.model("Group", groupSchema);

export default Group;
