const { createAdmin, getAllAdmins } = require("./admin");
const { createBlog, getBlogs, createImage, getImages } = require("./blog");
const { client } = require("./client");
const { blogs, images } = require("./data");

async function dropTables () {
    try {
        console.log('Starting to drop tables...');
        await client.query(`
            DROP TABLE IF EXISTS "blogImages";
            DROP TABLE IF EXISTS blogs;
            DROP TABLE IF EXISTS admin;
        `)
        console.log('Finished dropping tables!');
    } catch (error) {
        throw error;
    }
};

async function createTables () {
    try {
        console.log('Starting to build tables...');
        await client.query(`
            CREATE TABLE blogs (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                date TEXT NOT NULL, 
                content TEXT NOT NULL,
                "videoURL" TEXT
            );
            CREATE TABLE admin (
                id SERIAL PRIMARY KEY,
                email TEXT NOT NULL,
                password TEXT NOT NULL,
                UNIQUE(email)
            );
            CREATE TABLE "blogImages" (
                id SERIAL PRIMARY KEY,
                "imageId" INTEGER REFERENCES blogs(id),
                "imageURL" TEXT NOT NULL,
                caption TEXT
            );
        `)
        console.log('Finished building tables!');
    } catch (error) {
        throw error;
    }
};

async function createInitialAdmin () {
    try {
        await createAdmin({
            email: "emmaruthnagano@gmail.com",
            password: "emma789@eg"
        })
    } catch (error) {
        throw error
    }
};

async function createInitialBlog () {
    try {
        for(const blog of blogs) {
            await createBlog({
                title: blog.title,
                date: blog.date,
                content: blog.content,
                videoURL: blog.videoURL
            })
        }
    } catch (error) {
        throw error;
    }
};

async function createInitialImage () {
    try {
        for(const image of images) {
            await createImage({
                imageId: image.imageId,
                imageURL: image.imageURL,
                caption: image.caption
            })
        }
    } catch (error) {
        throw error;
    }
}

async function testDB () {
    try {
        console.log('Starting to test database...');

        const blogEntries = await getBlogs();
        console.log(blogEntries);

        const images = await getImages();
        console.log(images);

        console.log('Finished testing database!');
    } catch (error) {
        throw error;
    }
};

async function rebuildDB() {
    try {
        client.connect();
        await dropTables();
        await createTables();
        await createInitialAdmin();
        await createInitialBlog();
        await createInitialImage();
    } catch (error) {
        throw error;
    }
};

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
