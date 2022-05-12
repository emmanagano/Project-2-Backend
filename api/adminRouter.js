const express = require("express");
const { getAllAdmins } = require("../db/admin");
const adminRouter = express.Router();

adminRouter.get("/", async(req, res) => {
    try {
        const admin = await getAllAdmins();
        res.send(admin);
    } catch (error) {
        throw error;
    }
});

module.exports = adminRouter;