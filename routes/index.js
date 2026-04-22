// routes/index.js — Main / Login / Dashboard Routes

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/indexController');

// GET  /            — Login Page
router.get('/', controller.getLogin);

// POST /login       — Process Login Form
router.post('/login', controller.postLogin);

// GET  /dashboard   — Main Dashboard
router.get('/dashboard', controller.getDashboard);

// GET  /about       — About the System
router.get('/about', controller.getAbout);

module.exports = router;
