// routes/agenda.js — Agenda Management & Pre-Meeting Review Routes

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/agendaController');

// GET  /agenda             — List All Agendas
router.get('/', controller.getAgendas);

// GET  /agenda/create      — Create Agenda Form (before /:id)
router.get('/create', controller.getCreateAgenda);

// POST /agenda/create      — Submit Create Agenda Form
router.post('/create', controller.postCreateAgenda);

// GET  /agenda/:id         — View Agenda Details & Comments
router.get('/:id', controller.getAgendaById);

// POST /agenda/:id/comment — Submit Pre-Meeting Comment
router.post('/:id/comment', controller.postComment);

module.exports = router;
