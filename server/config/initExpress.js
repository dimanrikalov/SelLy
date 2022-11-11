const cors = require('cors');
const express = require('express');
const router = require('../router');
const {PORT} = require('../constants');

module.exports = () => {
    const app = express();

    app.use(express.json());

    app.use(
        cors({
            credentials: true,
        })
    );


    app.use(router);

    app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
};