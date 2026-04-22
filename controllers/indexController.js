// controllers/indexController.js — Dashboard & Login Logic

// Sample statistics data (simulates database values)
const dashboardStats = {
    totalDocuments : 1247,
    pendingAgendas : 3,
    upcomingMeetings: 2,
    totalUsers     : 18,
};

// Sample recent documents for dashboard
const recentDocuments = [
    { id: 1, title: 'Board Resolution No. 2024-045', type: 'Resolution', date: 'March 10, 2026', status: 'Active' },
    { id: 2, title: 'Minutes – Regular Board Meeting', type: 'Minutes',   date: 'March 5, 2026',  status: 'Active' },
    { id: 3, title: 'Agenda – Special Board Session', type: 'Agenda',     date: 'March 1, 2026',  status: 'Pending' },
    { id: 4, title: 'Board Resolution No. 2024-044', type: 'Resolution', date: 'Feb 28, 2026',  status: 'Active' },
    { id: 5, title: 'Official Correspondence – CHED', type: 'Correspondence', date: 'Feb 20, 2026', status: 'Active' },
];

// GET /  — Render Login Page
const getLogin = (req, res) => {
    res.render('login', {
        title: 'Login | BOARDLINK'
    });
};

// POST /login — Handle Login Form Submission
const postLogin = (req, res) => {
    const { username, password, role } = req.body;

    // Simple validation middleware check
    if (!username || !password || !role) {
        return res.render('login', {
            title: 'Login | BOARDLINK',
            error: 'All fields are required.'
        });
    }

    // Redirect to dashboard after login (no real auth for UI demo)
    res.redirect('/dashboard');
};

// GET /dashboard — Render Main Dashboard
const getDashboard = (req, res) => {
    res.render('dashboard', {
        title     : 'Dashboard | BOARDLINK',
        active    : 'dashboard',
        stats     : dashboardStats,
        documents : recentDocuments,
    });
};

// GET /about — About the System Page
const getAbout = (req, res) => {
    res.render('about', {
        title : 'About | BOARDLINK',
        active: 'about',
    });
};

module.exports = { getLogin, postLogin, getDashboard, getAbout };
