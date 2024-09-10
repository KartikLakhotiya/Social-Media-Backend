import mongoose from "mongoose";
import Blog from "../models/blog.model.js"
import User from "../models/user.model.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        console.log(error)
    }
    if (!blogs) {
        return res.status(404).json({ message: "Blogs not found" })
    }
    return res.status(200).json({ blogs });
}

export const addBlog = async (req, res) => {
    const { title, description, image, user } = req.body;
    let exisitngUser;
    try {
        exisitngUser = await User.findById(user)
    } 
    catch (error) {
        console.log(error)
    }
    if(!exisitngUser){
        return res.status(500).json({message:"Unauthorized user."})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        exisitngUser.blogs.push(blog);
        await exisitngUser.save({session})
        await session.commitTransaction();
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
    return res.status(200).json({ blog })
}

export const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message: error })
    }

    if (!blog) {
        return res.status(500).json({ message: "Unable to Update the blog." })
    }

    return res.status(200).json({ message:"Blog Updated." })


}

export const getBlogById = async(req,res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id);
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
    if(!blog){
        return res.status(404).json({message:"Blog not found"})
    }

    return res.status(200).json({blog});
}

export const deleteBlog = async(req,res) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
    if(!blog){
        return res.status(404).json({message:"Blog not found. Unable to delete"})
    }

    return res.status(200).json({message:"Blog deleted"})

}

export const getBlogByUserId = async(req,res) => {
    const userId = req.params.id;
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate("blogs");
    } 
    catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
    if(!userBlogs){
        return res.status(404).json({message:"No blog found"})
    }

    return res.status(200).json({blogs:userBlogs});
}