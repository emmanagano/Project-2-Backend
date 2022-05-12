const { client } = require("./client");

async function createAdmin ({
    email,
    password
}) {    
    try {
        const {rows: [admin]} = await client.query(`
            INSERT INTO admin (
                email,
                password
            )
            VALUES (
                $1, $2
            )
            RETURNING *;
        `,[email, password]);
        return admin;
    } catch (error) {
        throw error;
    }
};

async function getAllAdmins () {
    try {
        const {rows: [admins]} = await client.query(`
            SELECT * 
            FROM admin
        `)
        return admins;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
}