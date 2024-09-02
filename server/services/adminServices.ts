import mongoose from "mongoose";
import Amin from "../models/admin";
import bcrypt from "bcrypt";

export const createAdmin = async (data: any) => {
  try {
    const { username, password } = data;

    // Check if an admin with the same username already exists
    let admin = await Amin.findOne({ username });

    if (admin) {
      return { status: 400, message: "Admin already exists" };
    }

    // Hash the password before saving it
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create a new admin object
    const newAdmin = new Amin({
      username: username,
      password: hashPassword,
    });

    // Save the new admin to the database
    await newAdmin.save();

    return { status: 201, message: "Admin created successfully", admin: newAdmin };
  } catch (error) {
    console.log("Error in creating admin", error);
    return { status: 500, message: "Server error" };
  }
};
