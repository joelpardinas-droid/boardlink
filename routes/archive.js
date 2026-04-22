// routes/archive.js — Digital Archiving Module Routes

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/archiveController');

// GET  /archive             — Archive List with Search & Filter
router.get('/', controller.getArchive);

// GET  /archive/upload      — Upload Form (must be before /:id)
router.get('/upload', controller.getUpload);

// POST /archive/upload      — Handle Document Upload
router.post('/upload', controller.postUpload);

// GET  /archive/:id         — View Single Document
router.get('/:id', controller.getDocumentById);

module.exports = router;
