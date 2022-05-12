const express = require("express");
const { createBlog, getBlogs, createImage, getImages } = require("../db/blog");
const blogRouter = express.Router();

//BLOGS

blogRouter.post("/", async(req, res) => {
    try {
        const blog = await createBlog(req.body);
        res.send(blog);
    } catch (error) {
        res.send({
            error: error.message
        })
    }
});

blogRouter.get("/", async(req, res) => {
    try {
        const blogs = await getBlogs();
        res.send(blogs)
    } catch (error) {
        res.send({
            error: error.message
        })
    }
});

//IMAGES

blogRouter.post("/image", async(req, res) => {
    try {
        const image = await createImage(req.body);
        res.send(image);
    } catch (error) {
        res.send({
            error: error.message
        })
    }
});

blogRouter.get("/image", async(req, res) => {
    try {
        const images = await getImages();
        res.send(images);
    } catch (error) {
        res.send({
            error: error.message
        })
    }
})

module.exports = blogRouter;