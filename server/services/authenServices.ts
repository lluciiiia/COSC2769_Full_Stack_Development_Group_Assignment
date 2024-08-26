import User from "../models/user"
import bcrypt from "bcrypt";

export const regisNewAccount = async (data: any)=>{
    try{
        const email= data.email;
        const name= data.name;
        const password= data.password;

        let user= await User.findOne({email});
        if(user){
            return { status: 400, message: 'User already exists' };
        }

        const salt= await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashPassword,
          });

          await user.save();

          return { status: 201, message: 'User registered successfully' };
    }catch(error){
        console.error("Error in regisNewAccount:", error);
        return { status: 500, message: 'Server error' };
    }
}