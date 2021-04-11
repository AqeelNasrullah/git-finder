require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log('Connected to MongoDB'));

app.use(express.static(path.join(__dirname, 'client')));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on ${ port }`));