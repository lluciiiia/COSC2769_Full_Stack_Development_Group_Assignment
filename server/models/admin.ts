import mongoose from "mongoose";

const adminSchema= new mongoose.Schema({
    username: {type: String},
    password: {type: String},
})

const Admin= mongoose.model("Amin", adminSchema);

export default Admin;