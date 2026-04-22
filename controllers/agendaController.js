// controllers/agendaController.js — Agenda Management Module Logic

// Sample agenda data
const agendas = [
    {
        id      : 1,
        title   : '1st Regular Board Meeting – 2026',
        date    : 'March 20, 2026',
        time    : '9:00 AM',
        location: 'Board Room, CSPC Main Campus',
        status  : 'Upcoming',
        daysLeft: 8,
        items   : [
            'Call to Order',
            'Roll Call and Quorum Verification',
            'Approval of Previous Minutes',
            'Academic Calendar AY 2026–2027',
            'Budget Approval for Research Programs',
            'Other Matters',
            'Adjournment',
        ],
        comments: [
            { user: 'Dr. Reyes (Trustee)', text: 'Please include the enrollment data for Item 4.', date: 'March 12, 2026' },
            { user: 'Atty. Santos (Trustee)', text: 'I suggest revisiting the budget allocation for research.', date: 'March 13, 2026' },
        ],
    },
    {
        id      : 2,
        title   : 'Special Board Session – ICT Infrastructure',
        date    : 'March 28, 2026',
        time    : '2:00 PM',
        location: 'Conference Room B, Admin Building',
        status  : 'Upcoming',
        daysLeft: 16,
        items   : [
            'Call to Order',
            'Presentation – ICT Infrastructure Plan',
            'Review of Budget Proposals',
            'Resolution Drafting',
            'Adjournment',
        ],
        comments: [],
    },
];

// GET /agenda — List All Agendas
const getAgendas = (req, res) => {
    res.render('agenda/index', {
        title  : 'Agenda Management | BOARDLINK',
        active : 'agenda',
        agendas: agendas,
    });
};

// GET /agenda/:id — View Agenda Detail with Comments
const getAgendaById = (req, res) => {
    const agendaId = parseInt(req.params.id);
    const agenda = agendas.find(a => a.id === agendaId);

    if (!agenda) {
        return res.status(404).render('404', { title: 'Agenda Not Found | BOARDLINK' });
    }

    res.render('agenda/view', {
        title : `${agenda.title} | BOARDLINK`,
        active: 'agenda',
        agenda: agenda,
    });
};

// GET /agenda/create — Show Create Agenda Form
const getCreateAgenda = (req, res) => {
    res.render('agenda/create', {
        title : 'Create Agenda | BOARDLINK',
        active: 'agenda',
    });
};

// POST /agenda/create — Handle Create Agenda Form
const postCreateAgenda = (req, res) => {
    const { agendaTitle, agendaDate, agendaTime, agendaLocation } = req.body;

    if (!agendaTitle || !agendaDate || !agendaTime || !agendaLocation) {
        return res.render('agenda/create', {
            title : 'Create Agenda | BOARDLINK',
            active: 'agenda',
            error : 'Please fill in all required fields.',
        });
    }

    res.render('agenda/create', {
        title  : 'Create Agenda | BOARDLINK',
        active : 'agenda',
        success: `Agenda "${agendaTitle}" has been created. Members will be notified to review and submit comments.`,
    });
};

// POST /agenda/:id/comment — Submit Pre-Meeting Comment
const postComment = (req, res) => {
    const agendaId = parseInt(req.params.id);
    const { commentText, commenterName } = req.body;

    if (!commentText || !commenterName) {
        return res.redirect(`/agenda/${agendaId}`);
    }

    // In a real system, this saves to DB
    res.redirect(`/agenda/${agendaId}?success=Comment submitted successfully.`);
};

module.exports = { getAgendas, getAgendaById, getCreateAgenda, postCreateAgenda, postComment };
