const express = require('express');
const router = express.Router();

const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/userController');


// GET all users
router.get('/', getUsers);

// GET a single user by ID
router.get('/:id', getUser);

// POST a user
router.post('/', createUser);

// UPDATE a user by ID
router.put('/:id', updateUser);

//DELETE a request
router.delete('/:id', deleteUser);

module.exports = router;