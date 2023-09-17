const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/' , express.static('public'));

const budget_file = require("./budget.json");
var budget = budget_file;
console.log(budget_file);

app.get('/budget', (req, res) => {
    res.json(budget);
});

app.get('/hello', (req, res) => {
    res.send('Hello, world!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}...`);
});