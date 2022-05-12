const express = require('express');
const { client } = require('./db/client');

let PORT = process.env.PORT || 4000;

const app = express();

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');
app.use(cors());

app.use(express.json());

const apiRouter = require('./api/apiRouter');
app.use('/api', apiRouter);

app.use(express.static("build"));

app.use((err, req, res, next) => {
    res.status(400).send({
        name: err.name,
        message: err.message,
    });
});

app.listen(PORT, () => {
    console.log('server is up!', PORT);

    client.connect();
});
