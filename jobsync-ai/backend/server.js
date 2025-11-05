// backend/server.js
const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Only import analyzeResume from analyze.js
const { analyzeResume } = require('./utils/analyze');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ) {
            cb(null, true);
        } else {
            cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only PDF and DOCX files are allowed.'), false);
        }
    },
});

app.post('/api/upload', upload.single('resume'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file was uploaded. Please attach a file.' });
        }

        const jobDescription = req.body.jobDescription || '';
        if (!jobDescription.trim()) {
            return res.status(400).json({ error: 'Job description is empty. Please provide one.' });
        }

        // Call the centralized analyzeResume function, passing all necessary data
        const analysisResult = await analyzeResume(req.body.jobDescription, req.file.buffer, req.file.mimetype);

        res.status(200).json(analysisResult); // Send the entire analysisResult directly

    } catch (error) {
        console.error('[SERVER ERROR]:', error);
        if (error instanceof multer.MulterError) {
            return res.status(400).json({ error: error.message });
        }
        // Catch specific errors thrown from analyzeResume
        if (error.message.includes('parse') || error.message.includes('text') || error.message.includes('file type')) {
             return res.status(400).json({ error: error.message });
        }
        res.status(500).json({ error: 'An unexpected error occurred on the server.' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});