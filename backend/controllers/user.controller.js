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
    console.log("All Users : \n", users)
    return res.status(200).json({ users })
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    let existingUser;

    try {

        existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User with same email already exists." })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            name,
            email,
            password: hashedPassword,
            blogs: [],
        })

        await user.save();
        console.log(`User ${user.name} Created`)
        return res.status(201).json({ user })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error })
    }


}

export const login = async (req, res, next) => {
    try {

        const { email, password } = req.body;
        let existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(404).json({ message: "User not found." })
        }

        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid Password." })
        }

        console.log(`User ${existingUser.name} logged in.`)
        return res.status(200).json({ message: `User ${existingUser.name} logged in.` })

    }

    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }
}