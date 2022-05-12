require('dotenv').config();
const express = require("express");
const adminRouter = require("./adminRouter");
const blogRouter = require("./blogRouter");
const apiRouter = express.Router();

apiRouter.use("/admin", adminRouter);
apiRouter.use("/blog", blogRouter);

apiRouter.get("/", (req, res) => {
	res.send("api router working");
});

module.exports = apiRouter;
