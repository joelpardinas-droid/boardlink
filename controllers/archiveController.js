// controllers/archiveController.js — Digital Archiving Module Logic

// Sample archived documents (1985–present)
const archivedDocuments = [
    { id: 1,  title: 'Board Resolution No. 1985-001', type: 'Resolution',     year: 1985, date: 'Jan 15, 1985',  category: 'Institutional', status: 'Digitized' },
    { id: 2,  title: 'Board Resolution No. 1990-012', type: 'Resolution',     year: 1990, date: 'Mar 20, 1990',  category: 'Academic',      status: 'Digitized' },
    { id: 3,  title: 'Minutes – 1st Regular Meeting 2000', type: 'Minutes',   year: 2000, date: 'Feb 5, 2000',   category: 'Meeting',       status: 'Digitized' },
    { id: 4,  title: 'Official Correspondence – CHED 2005', type: 'Correspondence', year: 2005, date: 'Jun 10, 2005', category: 'External', status: 'Digitized' },
    { id: 5,  title: 'Board Resolution No. 2010-033', type: 'Resolution',     year: 2010, date: 'Aug 14, 2010',  category: 'Finance',       status: 'Digitized' },
    { id: 6,  title: 'Referenda – Academic Programs 2015', type: 'Referenda', year: 2015, date: 'Nov 8, 2015',   category: 'Academic',      status: 'Digitized' },
    { id: 7,  title: 'Board Resolution No. 2020-009', type: 'Resolution',     year: 2020, date: 'Jan 30, 2020',  category: 'Institutional', status: 'Digitized' },
    { id: 8,  title: 'Minutes – Special Session 2023', type: 'Minutes',       year: 2023, date: 'Jul 22, 2023',  category: 'Meeting',       status: 'Pending'   },
    { id: 9,  title: 'Board Resolution No. 2024-044', type: 'Resolution',     year: 2024, date: 'Feb 28, 2024',  category: 'Finance',       status: 'Digitized' },
    { id: 10, title: 'Board Resolution No. 2025-001', type: 'Resolution',     year: 2025, date: 'Jan 10, 2025',  category: 'Academic',      status: 'Digitized' },
];

// GET /archive — Show Archive List
const getArchive = (req, res) => {
    const { search, type, year } = req.query;

    // Filter documents based on query parameters
    let filtered = archivedDocuments;

    if (search) {
        const keyword = search.toLowerCase();
        filtered = filtered.filter(doc =>
            doc.title.toLowerCase().includes(keyword) ||
            doc.category.toLowerCase().includes(keyword)
        );
    }

    if (type && type !== 'all') {
        filtered = filtered.filter(doc => doc.type === type);
    }

    if (year && year !== 'all') {
        filtered = filtered.filter(doc => doc.year === parseInt(year));
    }

    res.render('archive/index', {
        title    : 'Digital Archive | BOARDLINK',
        active   : 'archive',
        documents: filtered,
        search   : search || '',
        type     : type   || 'all',
        year     : year   || 'all',
    });
};

// GET /archive/:id — View Single Document
const getDocumentById = (req, res) => {
    const docId = parseInt(req.params.id);
    const document = archivedDocuments.find(doc => doc.id === docId);

    if (!document) {
        return res.status(404).render('404', { title: 'Document Not Found | BOARDLINK' });
    }

    res.render('archive/view', {
        title   : `${document.title} | BOARDLINK`,
        active  : 'archive',
        document: document,
    });
};

// GET /archive/upload — Show Upload Form
const getUpload = (req, res) => {
    res.render('archive/upload', {
        title : 'Upload Document | BOARDLINK',
        active: 'archive',
    });
};

// POST /archive/upload — Handle Upload Form
const postUpload = (req, res) => {
    const { docTitle, docType, docYear, docCategory, docDescription } = req.body;

    // Validate required fields (middleware-style check inside controller)
    if (!docTitle || !docType || !docYear || !docCategory) {
        return res.render('archive/upload', {
            title  : 'Upload Document | BOARDLINK',
            active : 'archive',
            error  : 'Please fill in all required fields.',
        });
    }

    // In a real system, this would save to the database
    res.render('archive/upload', {
        title  : 'Upload Document | BOARDLINK',
        active : 'archive',
        success: `Document "${docTitle}" has been successfully uploaded and queued for OCR processing.`,
    });
};

module.exports = { getArchive, getDocumentById, getUpload, postUpload };
