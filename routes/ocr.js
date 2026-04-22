// routes/ocr.js — OCR Processing & AI-Powered Search Routes

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/ocrController');

// GET  /ocr          — OCR Processing Page
router.get('/', controller.getOcr);

// POST /ocr/process  — Submit Document for OCR
router.post('/process', controller.postProcess);

// GET  /ocr/search   — AI-Powered Document Search
router.get('/search', controller.getSearch);

module.exports = router;
