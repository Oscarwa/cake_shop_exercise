const express = require('express');
const cors = require('cors');
require('dotenv').config({silent: true});

const cakeRoute = require('./api/cake');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/cakes', cakeRoute);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});