import User from "../models/user.model.js";
import bcrypt from "bcrypt";


export const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find();

    } catch (error) {
        console.log(error)
    }

    if (!users) {
        return res.status(404).json({ message: "No Users Found" })
    }
    return res.status(200).json({ users })
}



export const signUp = async(req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {

        existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User with same email already exists."})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        const user = new User({
            name,
            email,
            password: hashedPassword
        })
    
        await user.save();
        return res.status(201).json({user})
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({error})
    }

    
}