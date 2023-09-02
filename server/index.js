require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const User = require('./models/userModel');


//Port const
const PORT = 3001 || process.env.PORT;
const URI = process.env.URI;


//ExpressMiddleware
app.use(express.json());



//routes
app.get('/', (req, res) => {
    res.send('Homepage');
});

// get request
app.get('/user', async (req, res) => {
    try {
        const user = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// post request
app.post('/user', async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.create({ name, email });
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


//Mongoose application connection
mongoose.set("strictQuery", false);
mongoose.connect(URI)
    .then(() => {
        console.log('Successfully connected to MongoDb');
        app.listen(PORT, () => {
            console.log(`Your server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
    })