import Blog from "../models/blog.model.js"

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
    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        await blog.save()
    } catch (error) {
        console.log(error)
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
        blog = await Blog.findByIdAndDelete(id);
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