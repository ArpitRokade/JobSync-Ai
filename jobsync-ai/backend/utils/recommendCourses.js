// backend/utils/recommendCourses.js

const courseLibrary = [
  {
    stream: 'Frontend Web Development',
    keywords: ['javascript', 'js', 'react', 'html', 'css', 'frontend', 'angular', 'vue', 'ui', 'ux', 'web design', 'webpack', 'babel', 'bootstrap', 'tailwind', 'material-ui', 'responsive design', 'webflow', 'typescript', 'jquery', 'scss', 'less', 'design systems', 'figma', 'sketch', 'adobe xd'],
    course: 'React - The Complete Guide (Frontend Focus)',
    url: 'https://www.udemy.com/course/react-the-complete-guide/',
  },
  {
    stream: 'Backend Web Development',
    keywords: ['node', 'express', 'mongodb', 'sql', 'backend', 'api', 'rest api', 'graphql', 'authentication', 'passportjs', 'jwt', 'sequelize', 'mongoose', 'microservices', 'docker', 'kubernetes', 'java', 'python-backend', 'spring', 'django', 'flask', 'php', 'laravel', 'ruby on rails', 'postgresql', 'mysql', 'serverless', 'c#', '.net', 'go', 'golang', 'rust', 'apis', 'database', 'system design'],
    course: 'Node.js and Express - The Complete Guide (Backend Focus)',
    url: 'https://www.udemy.com/course/nodejs-express-mongodb/',
  },
  {
    stream: 'Full Stack Web Development',
    keywords: ['javascript', 'js', 'react', 'html', 'css', 'frontend', 'backend', 'node', 'express', 'web development', 'fullstack', 'angular', 'vue', 'mongodb', 'sql', 'rest api', 'deployment', 'aws', 'azure', 'gcp', 'mern', 'mean', 'mevn', 'devops', 'ci/cd', 'git', 'github', 'gitlab', 'heroku', 'netlify', 'vercel'],
    course: 'Complete Full Stack Web Development Bootcamp',
    url: 'https://www.udemy.com/course/full-stack-web-developer/',
  },
  {
    stream: 'Data Science',
    keywords: ['python', 'pandas', 'numpy', 'data analysis', 'machine learning', 'data science', 'scikit-learn', 'tensorflow', 'r language', 'sql', 'statistics', 'power bi', 'tableau', 'jupyter', 'data visualization', 'ai', 'deep learning', 'nlp', 'computer vision', 'spark', 'hadoop', 'big data', 'pytorch', 'keras', 'data mining', 'data engineering', 'etl'],
    course: 'Python for Data Science',
    url: 'https://www.coursera.org/learn/python-for-applied-data-science',
  },
  {
    stream: 'Cloud Computing',
    keywords: ['aws', 'azure', 'gcp', 'cloud', 'deployment', 'devops', 'kubernetes', 'docker', 'serverless', 'lambda', 'ec2', 's3', 'vpc', 'iam', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'cloudformation', 'cloud security', 'azure devops', 'gcp cloud', 'vmware'],
    course: 'AWS Certified Solutions Architect',
    url: 'https://www.aws.training/',
  },
  {
    stream: 'Machine Learning',
    keywords: ['machine learning', 'scikit-learn', 'tensorflow', 'deep learning', 'modeling', 'neural networks', 'nlp', 'computer vision', 'pytorch', 'keras', 'algorithms', 'predictive modeling', 'ai', 'data science', 'statistics', 'model deployment', 'mlops'],
    course: 'Machine Learning A-Z',
    url: 'https://www.udemy.com/course/machinelearning/',
  },
  {
    stream: 'Soft Skills',
    keywords: ['communication', 'teamwork', 'leadership', 'emotional intelligence', 'presentation', 'negotiation', 'problem-solving', 'adaptability', 'critical thinking', 'time management', 'collaboration', 'interpersonal skills', 'creativity', 'work ethic', 'conflict resolution', 'mentoring', 'coaching'],
    course: 'Career Success Specialization',
    url: 'https://www.coursera.org/specializations/career-success',
  },
  {
    stream: 'Sales & Business Development',
    keywords: ['sales', 'marketing', 'lead generation', 'customer service', 'client management', 'business development', 'crm', 'salesforce', 'market research', 'b2b', 'b2c', 'negotiation', 'cold calling', 'pipeline management', 'strategy', 'revenue', 'account management', 'consultative selling', 'pitching', 'forecasting'],
    course: 'Sales Training - Techniques for a Human-Centric Sales Process',
    url: 'https://www.udemy.com/course/sales-training-techniques/',
  },
  {
    stream: 'Project & Product Management',
    keywords: ['project management', 'product management', 'scrum', 'agile', 'kanban', 'pmp', 'jira', 'confluence', 'roadmap', 'stakeholder management', 'risk management', 'budgeting', 'sdlc', 'product lifecycle', 'user stories', 'epics', 'sprints', 'prince2', 'lean', 'six sigma'],
    course: 'Project Management Professional (PMP)®',
    url: 'https://www.pmi.org/certifications/project-management-pmp',
  },
  {
    stream: 'Human Resources',
    keywords: ['human resources', 'recruitment', 'talent acquisition', 'employee relations', 'hr', 'hris', 'onboarding', 'compensation', 'benefits', 'hr policies', 'diversity', 'inclusion', 'performance management', 'workforce planning', 'labor law', 'employee engagement', 'training and development'],
    course: 'Human Resource Management: HR for People Managers',
    url: 'https://www.coursera.org/learn/human-resource-management',
  },
  {
    stream: 'Customer Service',
    keywords: ['customer service', 'client support', 'helpdesk', 'customer satisfaction', 'resolution', 'ticketing', 'zendesk', 'intercom', 'communication', 'problem-solving', 'escalation', 'crm', 'support tickets', 'live chat', 'call center', 'user support'],
    course: 'Customer Service Fundamentals',
    url: 'https://www.udemy.com/course/customer-service-fundamentals/',
  },
  {
    stream: 'Finance & Accounting',
    keywords: ['finance', 'accounting', 'bookkeeping', 'financial analysis', 'taxation', 'audit', 'budgeting', 'excel', 'quickbooks', 'sap', 'investing', 'corporate finance', 'financial modeling', 'cpa', 'acumen', 'forecasting', 'valuation', 'financial reporting', 'gaap', 'ifrs'],
    course: 'Introduction to Financial Accounting',
    url: 'https://www.coursera.org/learn/wharton-accounting',
  },
  {
    stream: 'Design & UX',
    keywords: ['design', 'ui', 'ux', 'figma', 'photoshop', 'illustrator', 'user experience', 'interface', 'adobe xd', 'wireframing', 'prototyping', 'usability testing', 'design thinking', 'graphic design', 'web design', 'motion graphics', 'branding', 'typography', 'color theory', 'interaction design'],
    course: 'UI / UX Design Specialization',
    url: 'https://www.coursera.org/specializations/ui-ux-design',
  },
  {
    stream: 'Healthcare',
    keywords: ['healthcare', 'patient care', 'nurse', 'clinic', 'medical', 'hospital', 'ehr', 'hipaa', 'pharmacology', 'diagnostics', 'public health', 'telemedicine', 'health administration', 'clinical research', 'nursing', 'medical terminology', 'patient safety'],
    course: 'Introduction to Healthcare',
    url: 'https://www.coursera.org/specializations/healthcare-management',
  },
  {
    stream: 'Education & Training',
    keywords: ['teaching', 'education', 'curriculum', 'pedagogy', 'instructor', 'learning', 'e-learning', 'instructional design', 'adult learning', 'classroom management', 'training development', 'lesson planning', 'educational technology', 'student engagement', 'assessment'],
    course: 'Foundations of Teaching for Learning',
    url: 'https://www.coursera.org/specializations/teaching',
  },
  {
    stream: 'Operations & Supply Chain',
    keywords: ['operations', 'logistics', 'supply chain', 'inventory', 'distribution', 'efficiency', 'lean management', 'six sigma', 'erp', 'procurement', 'warehousing', 'quality control', 'process improvement', 'global supply chain', 'demand planning', 'scm', 'logistics management'],
    course: 'Operations and Supply Chain Management',
    url: 'https://www.coursera.org/learn/wharton-operations',
  }
];

function extractKeywords(text) {
  if (!text) {
    console.log('[extractKeywords] Received empty text. Returning empty array.');
    return [];
  }

  const lowerText = text.toLowerCase();
  const keywords = new Set();

  // Define a more comprehensive list of multi-word and single-word important keywords
  // This must include ALL keywords from the courseLibrary streams to be effective
  const allPossibleKeywords = [
    // General terms applicable across multiple tech roles
    'developer', 'engineer', 'analyst', 'specialist', 'manager', 'lead', 'architect', 'dev', 'programming', 'coding', 'software', 'system', 'application', 'data', 'database', 'cloud', 'security', 'testing', 'qa', 'automation', 'methodologies', 'agile', 'scrum', 'kanban', 'git', 'github', 'gitlab', 'bitbucket', 'version control', 'linux', 'unix', 'windows server', 'networking', 'api', 'rest', 'graphql', 'json', 'xml', 'microservices', 'containerization', 'virtualization', 'ci/cd', 'jenkins', 'gitlab ci', 'github actions', 'jira', 'confluence', 'trello', 'slack', 'microsoft teams', 'g-suite', 'microsoft office', 'excel', 'powerpoint', 'word',

    // Web Development - Granular
    'javascript', 'js', 'react', 'html', 'css', 'frontend', 'backend', 'node', 'express', 'web development', 'fullstack', 'angular', 'vue', 'mongodb', 'sql', 'rest api',
    'ui', 'ux', 'web design', 'webpack', 'babel', 'bootstrap', 'tailwind', 'material-ui', 'responsive design', 'webflow', 'typescript', 'jquery', 'scss', 'less', 'design systems', 'figma', 'sketch', 'adobe xd', // Frontend specific
    'api', 'graphql', 'authentication', 'passportjs', 'jwt', 'sequelize', 'mongoose', 'microservices', 'docker', 'kubernetes', 'java', 'python-backend', 'spring', 'django', 'flask', 'php', 'laravel', 'ruby on rails', 'postgresql', 'mysql', 'serverless', 'c#', '.net', 'go', 'golang', 'rust', 'apis', 'database', 'system design', // Backend specific
    'mern', 'mean', 'mevn', 'deployment', 'devops', 'ci/cd', 'git', 'github', 'gitlab', 'heroku', 'netlify', 'vercel', // Fullstack specific

    // Data Science
    'python', 'pandas', 'numpy', 'data analysis', 'machine learning', 'data science', 'scikit-learn', 'tensorflow', 'r language', 'sql', 'statistics', 'power bi', 'tableau', 'jupyter', 'data visualization', 'ai', 'deep learning', 'nlp', 'computer vision', 'spark', 'hadoop', 'big data', 'pytorch', 'keras', 'data mining', 'data engineering', 'etl', 'modeling', 'predictive analytics', 'descriptive analytics', 'prescriptive analytics',

    // Cloud Computing
    'aws', 'azure', 'gcp', 'cloud', 'deployment', 'devops', 'kubernetes', 'docker', 'serverless', 'lambda', 'ec2', 's3', 'vpc', 'iam', 'terraform', 'ansible', 'jenkins', 'ci/cd', 'cloudformation', 'cloud security', 'azure devops', 'gcp cloud', 'vmware', 'vm', 'network', 'storage', 'monitoring', 'logging',

    // Machine Learning
    'machine learning', 'scikit-learn', 'tensorflow', 'deep learning', 'modeling', 'neural networks', 'nlp', 'computer vision', 'pytorch', 'keras', 'algorithms', 'predictive modeling', 'ai', 'data science', 'statistics', 'model deployment', 'mlops', 'data mining', 'feature engineering', 'reinforcement learning', 'supervised learning', 'unsupervised learning',

    // Soft Skills
    'communication', 'teamwork', 'leadership', 'emotional intelligence', 'presentation', 'negotiation', 'problem-solving', 'adaptability', 'critical thinking', 'time management', 'collaboration', 'interpersonal skills', 'creativity', 'work ethic', 'conflict resolution', 'mentoring', 'coaching', 'public speaking', 'decision making', 'flexibility',

    // Sales & Business Development
    'sales', 'marketing', 'lead generation', 'customer service', 'client management', 'business development', 'crm', 'salesforce', 'market research', 'b2b', 'b2c', 'negotiation', 'cold calling', 'pipeline management', 'strategy', 'revenue', 'account management', 'consultative selling', 'pitching', 'forecasting', 'market analysis', 'customer acquisition', 'brand management',

    // Project & Product Management
    'project management', 'product management', 'scrum', 'agile', 'kanban', 'pmp', 'jira', 'confluence', 'roadmap', 'stakeholder management', 'risk management', 'budgeting', 'sdlc', 'product lifecycle', 'user stories', 'epics', 'sprints', 'prince2', 'lean', 'six sigma', 'requirements gathering', 'release management', 'go-to-market', 'business analysis',

    // Human Resources
    'human resources', 'recruitment', 'talent acquisition', 'employee relations', 'hr', 'hris', 'onboarding', 'compensation', 'benefits', 'hr policies', 'diversity', 'inclusion', 'performance management', 'workforce planning', 'labor law', 'employee engagement', 'training and development', 'organizational development', 'hr analytics', 'payroll',

    // Customer Service
    'customer service', 'client support', 'helpdesk', 'customer satisfaction', 'resolution', 'ticketing', 'zendesk', 'intercom', 'communication', 'problem-solving', 'escalation', 'crm', 'support tickets', 'live chat', 'call center', 'user support', 'technical support', 'customer retention', 'feedback',

    // Finance & Accounting
    'finance', 'accounting', 'bookkeeping', 'financial analysis', 'taxation', 'audit', 'budgeting', 'excel', 'quickbooks', 'sap', 'investing', 'corporate finance', 'financial modeling', 'cpa', 'acumen', 'forecasting', 'valuation', 'financial reporting', 'gaap', 'ifrs', 'financial statements', 'bookkeeping', 'xero', 'tally',

    // Design & UX
    'design', 'ui', 'ux', 'figma', 'photoshop', 'illustrator', 'user experience', 'interface', 'adobe xd', 'wireframing', 'prototyping', 'usability testing', 'design thinking', 'graphic design', 'web design', 'motion graphics', 'branding', 'typography', 'color theory', 'interaction design', 'service design', 'accessibility', 'user research', 'information architecture',

    // Healthcare
    'healthcare', 'patient care', 'nurse', 'clinic', 'medical', 'hospital', 'ehr', 'hipaa', 'pharmacology', 'diagnostics', 'public health', 'telemedicine', 'health administration', 'clinical research', 'nursing', 'medical terminology', 'patient safety', 'medical coding', 'electronic health records', 'patient advocacy',

    // Education & Training
    'teaching', 'education', 'curriculum', 'pedagogy', 'instructor', 'learning', 'e-learning', 'instructional design', 'adult learning', 'classroom management', 'training development', 'lesson planning', 'educational technology', 'student engagement', 'assessment', 'course development', 'curriculum design', 'online learning',

    // Operations & Supply Chain
    'operations', 'logistics', 'supply chain', 'inventory', 'distribution', 'efficiency', 'lean management', 'six sigma', 'erp', 'procurement', 'warehousing', 'quality control', 'process improvement', 'global supply chain', 'demand planning', 'scm', 'logistics management', 'production', 'manufacturing', 'quality assurance', 'risk management', 'customs', 'transportation',
  ];

  // First, add all specific keywords from the 'allPossibleKeywords' list that appear in the text
  allPossibleKeywords.forEach(keyword => {
    // Use a regular expression with word boundaries to avoid partial matches
    // e.g., 'java' won't match 'javascript' unless it's a separate word
    const regex = new RegExp(`\\b${keyword}\\b`, 'i'); // 'i' for case-insensitive
    if (regex.test(lowerText)) {
      keywords.add(keyword);
    }
  });

  console.log('[extractKeywords] Keywords identified:', Array.from(keywords));
  return Array.from(keywords);
}

// Detect stream based on highest overlap of keywords
function detectStream(resumeText, jobText) {
  const resumeKW = extractKeywords(resumeText);
  const jobKW = extractKeywords(jobText);

  // Combine and de-duplicate all keywords from both resume and job description
  const allRelevantKW = [...new Set([...resumeKW, ...jobKW])];
  console.log('[detectStream] All Relevant Keywords:', allRelevantKW);

  const scores = {};
  let maxScore = 0;
  let topStream = 'General'; // Default to General if no strong match

  courseLibrary.forEach(course => {
    // Calculate how many of the course's keywords are present in allRelevantKW
    const matchedKeywordsInStream = course.keywords.filter(k => allRelevantKW.includes(k)).length;
    scores[course.stream] = matchedKeywordsInStream;

    // Determine the top stream
    if (matchedKeywordsInStream > maxScore) {
      maxScore = matchedKeywordsInStream;
      topStream = course.stream;
    }
  });
  console.log('[detectStream] Stream Scores:', scores);
  console.log('[detectStream] Top Stream:', topStream, 'Score:', maxScore);

  return { detectedStream: topStream, score: maxScore, streamScores: scores };
}

// Recommend courses based on missing keywords
function recommendCourses(missingSkills) {
  const recommendations = [];
  const uniqueRecommendations = new Set(); // To avoid duplicate course recommendations

  courseLibrary.forEach(course => {
    const hasMatch = missingSkills.some(skill =>
      course.keywords.includes(skill.toLowerCase())
    );
    if (hasMatch) {
      const courseId = `${course.course}-${course.url}`; // Create a unique ID
      if (!uniqueRecommendations.has(courseId)) {
        recommendations.push({
          stream: course.stream,
          course: course.course,
          url: course.url,
        });
        uniqueRecommendations.add(courseId);
      }
    }
  });
  console.log('[recommendCourses] Recommendations:', recommendations);
  return recommendations;
}

// --- ENSURE THESE ARE CORRECTLY EXPORTED ---
module.exports = {
  extractKeywords,
  detectStream,
  recommendCourses,
};