// routes/meeting.js — Meeting Documentation, AI Transcription & Summary Routes

const express    = require('express');
const router     = express.Router();
const controller = require('../controllers/meetingController');

// GET  /meeting                  — Meeting List
router.get('/', controller.getMeetings);

// GET  /meeting/transcription    — AI Transcription Page (before /:id)
router.get('/transcription', controller.getTranscription);

// POST /meeting/transcription    — Process AI Transcription
router.post('/transcription', controller.postTranscription);

// GET  /meeting/summary          — AI Summary Page
router.get('/summary', controller.getSummary);

// POST /meeting/summary          — Process AI Summary
router.post('/summary', controller.postSummary);

// GET  /meeting/:id              — View Meeting Details
router.get('/:id', controller.getMeetingById);

module.exports = router;
