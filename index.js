const express = require('express');
const cakeRoute = require('./api/cake');
require('dotenv').config();

const app = express();

app.use(express.json());

app.use('/cakes', cakeRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});