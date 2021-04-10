require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'client')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${ port }`));