const User = require('../models/userModel');


// GET all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
}

// GET a single user by ID
const getUser = async (req, res) => {
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
}

// POST a user
const createUser = async (req, res) => {
    const { name, email } = req.body;

    try {
        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}

// UPDATE a user by ID
const updateUser = async (req, res) => {
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
}

//DELETE a request
const deleteUser = async (req, res) => {
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
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }