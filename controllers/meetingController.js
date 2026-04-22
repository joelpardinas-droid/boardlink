// controllers/meetingController.js — Meeting Documentation Module Logic

// Sample meeting records
const meetings = [
    {
        id          : 1,
        title       : '4th Regular Board Meeting – 2025',
        date        : 'December 15, 2025',
        time        : '9:00 AM',
        location    : 'Board Room, CSPC Main Campus',
        status      : 'Completed',
        quorum      : 'Established (9 of 11 members present)',
        attendees   : ['Dr. M. Reyes', 'Atty. R. Santos', 'Engr. L. Cruz', 'Dr. A. Bautista', 'Ms. J. Garcia', 'Mr. P. Dela Rosa', 'Dr. S. Villanueva', 'Atty. C. Lim', 'Prof. M. Torres'],
        absent      : ['Dr. K. Navarro', 'Engr. B. Ocampo'],
        motions     : [
            { motion: 'Approval of AY 2025-2026 Academic Calendar', result: 'Approved unanimously' },
            { motion: 'Budget allocation for infrastructure improvements', result: 'Approved with amendments' },
        ],
        minutes     : 'Minutes drafted and distributed on December 18, 2025.',
        transcriptReady: true,
        summaryReady   : true,
    },
    {
        id          : 2,
        title       : '1st Regular Board Meeting – 2026',
        date        : 'March 20, 2026',
        time        : '9:00 AM',
        location    : 'Board Room, CSPC Main Campus',
        status      : 'Upcoming',
        quorum      : 'Pending',
        attendees   : [],
        absent      : [],
        motions     : [],
        minutes     : '',
        transcriptReady: false,
        summaryReady   : false,
    },
];

// GET /meeting — List All Meetings
const getMeetings = (req, res) => {
    res.render('meeting/index', {
        title   : 'Meeting Documentation | BOARDLINK',
        active  : 'meeting',
        meetings: meetings,
    });
};

// GET /meeting/:id — View Meeting Details
const getMeetingById = (req, res) => {
    const meetingId = parseInt(req.params.id);
    const meeting = meetings.find(m => m.id === meetingId);

    if (!meeting) {
        return res.status(404).render('404', { title: 'Meeting Not Found | BOARDLINK' });
    }

    res.render('meeting/view', {
        title  : `${meeting.title} | BOARDLINK`,
        active : 'meeting',
        meeting: meeting,
    });
};

// GET /meeting/transcription — AI Transcription Module Page
const getTranscription = (req, res) => {
    res.render('meeting/transcription', {
        title : 'AI Transcription | BOARDLINK',
        active: 'meeting',
    });
};

// POST /meeting/transcription — Handle Transcription Request
const postTranscription = (req, res) => {
    const { meetingTitle, meetingDate } = req.body;

    const sampleTranscript = `[00:00] Board Secretary: I now call this meeting to order. We have a quorum established with nine members present.\n[00:45] Dr. Reyes: Thank you. I move to approve the minutes of our previous meeting.\n[01:10] Atty. Santos: I second the motion.\n[01:15] Board Secretary: Motion carried. The minutes are approved.\n[02:30] Engr. Cruz: I would like to raise a concern regarding the infrastructure budget allocation...`;

    res.render('meeting/transcription', {
        title     : 'AI Transcription | BOARDLINK',
        active    : 'meeting',
        transcript: sampleTranscript,
        success   : `Transcription for "${meetingTitle}" completed successfully.`,
    });
};

// GET /meeting/summary — AI Summary Module Page
const getSummary = (req, res) => {
    res.render('meeting/summary', {
        title : 'AI Meeting Summary | BOARDLINK',
        active: 'meeting',
    });
};

// POST /meeting/summary — Handle Summary Request
const postSummary = (req, res) => {
    const { meetingRef } = req.body;

    const sampleSummary = `MEETING SUMMARY\n\nMeeting: ${meetingRef || '4th Regular Board Meeting 2025'}\nDate: December 15, 2025\n\nKEY DECISIONS:\n1. The Academic Calendar for AY 2025-2026 was unanimously approved.\n2. Infrastructure budget allocation was approved with amendments.\n\nACTION ITEMS:\n- Board Secretary to distribute approved calendar to all departments.\n- Finance Office to revise budget proposal per board recommendations.\n\nNEXT MEETING: March 20, 2026`;

    res.render('meeting/summary', {
        title  : 'AI Meeting Summary | BOARDLINK',
        active : 'meeting',
        summary: sampleSummary,
        success: 'AI summary generated successfully.',
    });
};

module.exports = { getMeetings, getMeetingById, getTranscription, postTranscription, getSummary, postSummary };
