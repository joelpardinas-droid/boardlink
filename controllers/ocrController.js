// controllers/ocrController.js — OCR Document Processing Module Logic

// GET /ocr — OCR Processing Page
const getOcr = (req, res) => {
    res.render('ocr/index', {
        title : 'OCR Processing | BOARDLINK',
        active: 'ocr',
    });
};

// POST /ocr/process — Handle OCR Processing Request
const postProcess = (req, res) => {
    const { documentName, documentYear, documentType } = req.body;

    if (!documentName || !documentYear || !documentType) {
        return res.render('ocr/index', {
            title : 'OCR Processing | BOARDLINK',
            active: 'ocr',
            error : 'Please provide all required document information.',
        });
    }

    // Simulated OCR extracted text result
    const extractedText = `REPUBLIC OF THE PHILIPPINES\nCAMARINES SUR POLYTECHNIC COLLEGES\nNabua, Camarines Sur\n\nBOARD RESOLUTION NO. ${documentYear}-001\n\nSERIES OF ${documentYear}\n\nRESOLUTION ADOPTING THE ACADEMIC CALENDAR FOR ACADEMIC YEAR ${documentYear}-${parseInt(documentYear)+1}\n\nWHEREAS, the Board of Trustees of Camarines Sur Polytechnic Colleges convened in its Regular Session...\n\nNOW THEREFORE, BE IT RESOLVED, as it is hereby resolved to adopt the said Academic Calendar.\n\nDONE in the City of Nabua, Camarines Sur, Philippines.`;

    const metadata = {
        documentType : documentType,
        year         : documentYear,
        institution  : 'Camarines Sur Polytechnic Colleges',
        extractedOn  : new Date().toLocaleDateString(),
        wordCount    : extractedText.split(' ').length,
        confidence   : '94.7%',
    };

    res.render('ocr/result', {
        title        : 'OCR Result | BOARDLINK',
        active       : 'ocr',
        documentName : documentName,
        extractedText: extractedText,
        metadata     : metadata,
    });
};

// GET /ocr/search — AI-Powered Search Page
const getSearch = (req, res) => {
    const { query } = req.query;

    // Sample search results pool
    const allDocuments = [
        { id: 1, title: 'Board Resolution No. 2024-045', type: 'Resolution', year: 2024, snippet: '...resolved to approve the revised academic calendar for AY 2024-2025...' },
        { id: 2, title: 'Minutes – Regular Board Meeting March 2024', type: 'Minutes', year: 2024, snippet: '...quorum was established with ten members present. The board discussed the infrastructure...' },
        { id: 3, title: 'Board Resolution No. 2023-012', type: 'Resolution', year: 2023, snippet: '...resolved to allocate funds for the construction of the new laboratory building...' },
        { id: 4, title: 'Official Correspondence – CHED 2023', type: 'Correspondence', year: 2023, snippet: '...regarding the compliance requirements for AACCUP accreditation Level III...' },
        { id: 5, title: 'Referenda – Curriculum Revision 2022', type: 'Referenda', year: 2022, snippet: '...faculty members voted on the proposed changes to the BSIT curriculum...' },
    ];

    let results = [];

    if (query) {
        const keyword = query.toLowerCase();
        results = allDocuments.filter(doc =>
            doc.title.toLowerCase().includes(keyword) ||
            doc.snippet.toLowerCase().includes(keyword) ||
            doc.type.toLowerCase().includes(keyword)
        );
    }

    res.render('ocr/search', {
        title  : 'AI-Powered Search | BOARDLINK',
        active : 'ocr',
        query  : query || '',
        results: results,
    });
};

module.exports = { getOcr, postProcess, getSearch };
