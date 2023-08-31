const express = require('express');
const mongoose = require('mongoose');
const app = express();

const User = require('./models/userModel');


//Port const
const PORT = 3001 || process.env.PORT;


//ExpressMiddleware
app.use(express.json());



//routes
app.get('/', (req, res) => {
    res.send('Homepage');
});

// get request
app.get('/user', async (req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });

    }

});

// post request
app.post('/user', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});


//Mongoose application connection
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://udoh:Admin1234@users.tb33vvn.mongodb.net/users?retryWrites=true&w=majority')
    .then(() => {
        console.log('Successfully connected to MongoDb');
        app.listen(PORT, () => {
            console.log(`Your server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });