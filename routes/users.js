// routes/users.js — User and Access Management Routes

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/usersController');

// GET  /users       — List All Users
router.get('/', controller.getUsers);

// GET  /users/add   — Add User Form (before /:id)
router.get('/add', controller.getAddUser);

// POST /users/add   — Submit Add User Form
router.post('/add', controller.postAddUser);

// GET  /users/:id   — View User Profile
router.get('/:id', controller.getUserById);

module.exports = router;
