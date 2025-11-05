const express = require('express');
const multer = require('multer');
const router = express.Router(); // <--- Key part: creating an Express Router
const pdfParse = require('pdf-parse');
const recommendCourses = require('../utils/recommendCourses'); // <--- A utility you're importing

// Set up Multer with PDF-only filter and 5MB size limit
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'application/pdf') {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE', 'Only PDF files are allowed'));
    }
    cb(null, true);
  }
});

// Utility: extract keywords from text (lowercase, split on non-word chars)
function extractKeywords(text) {
  return text.toLowerCase().split(/\W+/).filter(Boolean);
}

// Score how well resume matches job description keywords
function scoreResume(resumeText, jobDesc) {
  const resumeWords = extractKeywords(resumeText);
  const jobWords = extractKeywords(jobDesc);
  let matched = 0;
  jobWords.forEach(w => {
    if (resumeWords.includes(w)) matched++;
  });
  if (jobWords.length === 0) return 0;
  return (matched / jobWords.length) * 100;
}

// Determine stream/category based on resume text
function detectStream(text) {
  const lower = text.toLowerCase();
  if (lower.match(/java|python|c\+\+|react|node/)) return 'Software Development';
  if (lower.match(/marketing|seo|content|advertising/)) return 'Marketing';
  if (lower.match(/finance|accounting|tax|audit/)) return 'Finance';
  if (lower.match(/design|ui|ux|graphic|photoshop/)) return 'Design';
  return 'General';
}

// Robust upload route with error handling
router.post('/upload', (req, res, next) => { // <--- Defines a route on THIS router
  upload.single('resume')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ error: 'PDF file is too large. Max size is 5MB.' });
      }
      if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ error: 'Only PDF files are allowed.' });
      }
      return res.status(400).json({ error: err.message });
    } else if (err) {
      return res.status(500).json({ error: 'File upload failed.' });
    }
    next();
  });
}, async (req, res) => {
  try {
    // For multipart/form-data, text fields are in req.body
    const jobDescription = req.body.description || ''; // <--- Looks for 'description'
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    if (!jobDescription) return res.status(400).json({ error: 'Job description is required' });

    let data;
    try {
      data = await pdfParse(req.file.buffer);
    } catch (pdfErr) {
      return res.status(400).json({ error: 'Failed to parse PDF. Please upload a valid PDF file.' });
    }
    const resumeText = data.text;

    // Calculate missing skills
    const resumeKeywords = extractKeywords(resumeText);
    const jobKeywords = extractKeywords(jobDescription);
    const missingSkills = jobKeywords.filter(k => !resumeKeywords.includes(k));

    const score = scoreResume(resumeText, jobDescription);
    const stream = detectStream(resumeText);

    let message;
    let courses = [];

    if (score < 75) {
      message = 'Score is less than 75, we recommend courses to improve.';
      courses = recommendCourses(missingSkills);
    } else {
      message = 'You are fit for the job!';
    }

    const analysis = {
      skillsMatch: score,
      otherFactors: 100 - score,
    };

    res.json({
      score: score.toFixed(2),
      stream,
      message,
      courses,
      analysis,
    });
  } catch (error) {
    console.error('Error in /upload route:', error);
    res.status(500).json({ error: 'Failed to analyze resume. Please ensure it is a valid PDF and try again.' });
  }
});

module.exports = router; // <--- Exports the router