// backend/utils/analyze.js
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
// Correctly import all functions from recommendCourses.js
const { extractKeywords, detectStream, recommendCourses } = require('./recommendCourses');

async function analyzeResume(jobDescription, resumeBuffer, resumeMimetype) {
    let resumeText = '';

    // Handle PDF parsing
    if (resumeMimetype === 'application/pdf') {
        try {
            const pdfData = await pdfParse(resumeBuffer);
            resumeText = pdfData.text;
            console.log('[analyzeResume] PDF Text extracted (first 200 chars):', resumeText.substring(0, Math.min(resumeText.length, 200)) + '...');
        } catch (pdfError) {
            console.error('[Analyze Resume PDF Error]:', pdfError);
            throw new Error('Failed to parse PDF. It might be corrupted or image-only.');
        }
    }
    // Handle DOCX parsing
    else if (resumeMimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        try {
            const mammothResult = await mammoth.extractRawText({ buffer: resumeBuffer });
            resumeText = mammothResult.value;
            console.log('[analyzeResume] DOCX Text extracted (first 200 chars):', resumeText.substring(0, Math.min(resumeText.length, 200)) + '...');
        } catch (mammothError) {
            console.error('[Analyze Resume DOCX Error]:', mammothError);
            throw new Error('Failed to parse DOCX. It might be corrupted or malformed.');
        }
    } else {
        throw new Error('Unsupported file type for resume analysis.');
    }

    if (!resumeText.trim()) {
        console.error('[analyzeResume] Extracted resume text is empty after parsing.');
        throw new Error('Could not extract text from the uploaded file. The file might be empty or unreadable.');
    }

    if (!jobDescription.trim()) {
        console.warn('[analyzeResume] Job description is empty or only whitespace. This will affect skill matching.');
    }

    // --- USE THE IMPORTED extractKeywords FUNCTION ---
    const jobKeywords = extractKeywords(jobDescription || ''); // Ensure jobDescription is a string
    const resumeKeywords = extractKeywords(resumeText);

    console.log('[analyzeResume] Extracted Job Keywords:', jobKeywords);
    console.log('[analyzeResume] Extracted Resume Keywords:', resumeKeywords);

    // Calculate fitment score
    const matchedSkills = jobKeywords.filter(skill => resumeKeywords.includes(skill));
    const missingSkills = jobKeywords.filter(skill => !resumeKeywords.includes(skill));

    console.log('[analyzeResume] Calculated Matched Skills:', matchedSkills);
    console.log('[analyzeResume] Calculated Missing Skills:', missingSkills);


    const fitmentScore = jobKeywords.length === 0
        ? 0
        : parseFloat(((matchedSkills.length / jobKeywords.length) * 100).toFixed(2));

    const isFit = fitmentScore >= 75;

    // --- USE THE IMPORTED detectStream FUNCTION ---
    // Here, streamScores is correctly destructured
    const { detectedStream, score: streamMatchCount, streamScores } = detectStream(resumeText, jobDescription || '');

    // --- USE THE IMPORTED recommendCourses FUNCTION ---
    const coursesToRecommend = !isFit ? recommendCourses(missingSkills) : [];

    const message = isFit
        ? 'Excellent match! You are a strong candidate for this role.'
        : 'Your profile has areas for improvement. See below for suggestions.';

    const finalAnalysisResult = {
        fitmentScore,
        detectedStream,
        message,
        courses: coursesToRecommend,
        analysis: {
            jobKeywords,
            resumeKeywords,
            matchedSkillsCount: matchedSkills.length,
            missingSkillsCount: missingSkills.length,
            matchedSkills,
            missingSkills,
            streamMatchCount,
            streamScores, // <-- FIXED: Changed from allStreamScores to streamScores
        },
    };

    console.log('[analyzeResume] Final analysis result being sent:', JSON.stringify(finalAnalysisResult, null, 2));

    return finalAnalysisResult;
}

module.exports = { analyzeResume };