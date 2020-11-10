const express = require('express');
const cakeRoute = require('./api/cake');

const app = express();

app.use(express.json());

app.use('/cakes', cakeRoute);

const port = 8081;
app.listen(port, () => {
    console.log(`App running at port: ${port}`);
});