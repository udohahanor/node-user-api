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
app.use(express.urlencoded({ extended: false }));



//routes
app.get('/', (req, res) => {
    res.send('Homepage');
});

// GET all requests
app.get('/user', async (req, res) => {
    try {
        const user = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// GET a single user by ID
app.get('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: `Cannot find user with id ${id}` });
        }

        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a user
app.post('/user', async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a user by ID
app.put('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, req.body);

        if (!user) {
            return res.status(404).json({ message: `Cannot find user with id ${id}` });
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
});

//DELETE a request
app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `Cannot find user with id ${id}` });
        }
        res.status(200).json({ message: `User with id ${id} does not exist` });

    } catch (error) {
        console.error(error.message);
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
    });