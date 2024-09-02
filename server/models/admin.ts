import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String,  required: true},
})

const Admin= mongoose.model("Amin", adminSchema);

export default Admin;