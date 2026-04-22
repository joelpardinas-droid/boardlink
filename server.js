// ─────────────────────────────────────────────────────────────────────────────
// server.js — BOARDLINK Main Entry Point
// BSIT 3 | ITEC 321 | Web Systems and Technologies 3
// ─────────────────────────────────────────────────────────────────────────────

const express = require('express');
const path    = require('path');

// ── Import Routers ────────────────────────────────────────────────────────────
const indexRouter   = require('./routes/index');
const archiveRouter = require('./routes/archive');
const agendaRouter  = require('./routes/agenda');
const meetingRouter = require('./routes/meeting');
const ocrRouter     = require('./routes/ocr');
const usersRouter   = require('./routes/users');

const app      = express();
const hostname = '127.0.0.1';
const port     = 3000;

// ── View Engine Setup ─────────────────────────────────────────────────────────
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// ── Middleware Stack ──────────────────────────────────────────────────────────
// 1. Parse URL-encoded form data (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// 2. Parse incoming JSON request bodies
app.use(express.json());

// 3. Serve static files (CSS, JS, images) from /public folder
app.use(express.static(path.join(__dirname, 'public')));

// 4. Custom logger middleware — logs method and URL for every request
app.use((req, res, next) => {
    const timestamp = new Date().toLocaleString();
    console.log(`[${timestamp}]  ${req.method}  ${req.url}`);
    next();
});

// ── Route Mounting ────────────────────────────────────────────────────────────
app.use('/',        indexRouter);
app.use('/archive', archiveRouter);
app.use('/agenda',  agendaRouter);
app.use('/meeting', meetingRouter);
app.use('/ocr',     ocrRouter);
app.use('/users',   usersRouter);

// ── 404 Error Handler Middleware ──────────────────────────────────────────────
app.use((req, res) => {
    res.status(404).render('404', { title: 'Page Not Found | BOARDLINK' });
});

// ── Start Server ──────────────────────────────────────────────────────────────
app.listen(port, hostname, () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════════╗');
    console.log('  ║     BOARDLINK Server is Running              ║');
    console.log(`  ║     http://${hostname}:${port}                   ║`);
    console.log('  ║     CSPC - Office of the Board Secretary     ║');
    console.log('  ╚══════════════════════════════════════════════╝');
    console.log('');
});
