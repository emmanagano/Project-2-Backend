const { client } = require("./client");

//BLOGS

async function createBlog ({
    title,
    date,
    content,
    videoURL
}) {
    try {
        const {rows: [blog]} = await client.query(`
            INSERT INTO blogs (
                title,
                date,
                content,
                "videoURL"
            )
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `,[title, date, content, videoURL]);
        return blog;
    } catch (error) {
        throw error;
    }
};

async function getBlogs () {
    try {
        const {rows: blogs} = await client.query(`
            SELECT *
            FROM blogs;
        `)
        return blogs;
    } catch (error) {
        throw error;
    }
};


//IMAGES

async function createImage ({
    imageId,
    imageURL,
    caption
}) {
    try {
        const {rows: [image]} = await client.query(`
            INSERT INTO "blogImages" (
                "imageId",
                "imageURL",
                caption
            )
            VALUES ($1, $2, $3)
            RETURNING *;
        `,[imageId, imageURL, caption])
        return image;
    } catch (error) {
        throw error;
    }
}

async function getImages () {
    try {
        const {rows: images} = await client.query(`
            SELECT *
            FROM "blogImages"
        `)
        return images;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createBlog,
    getBlogs,
    createImage,
    getImages
}