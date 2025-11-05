import React, { useEffect, useState } from "react";
// Import Arc for the custom gauge effect
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Arc } from "recharts";
import styled from "styled-components";
import { FaGraduationCap, FaCheckCircle, FaTimesCircle, FaChartPie, FaLightbulb } from 'react-icons/fa';

// --- Styled Components (No major changes here, already good) ---
const DashboardWrapper = styled.div`
  min-height: 100vh;
  background-color: #F8FAFC;
  color: #334155;
  font-family: 'Roboto', sans-serif;
  padding: 1.5rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #E2E8F0;
  margin-bottom: 2rem;

  h1 {
    font-size: 1.8rem;
    font-weight: 700;
    color: #1E293B;
  }
`;

const MaxWidthContainer = styled.div`
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
`;

const MainGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Card = styled.div`
  background-color: #FFFFFF;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #E2E8F0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #64748B;
  font-size: 0.9rem;
  font-weight: 500;

  ${props => props.leftAlign && `
    justify-content: flex-start;
    gap: 0.5rem;
  `}
`;

const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1E293B;
  margin-top: 0.5rem;
`;

const CareerStreamCardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;

const CareerStreamText = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  color: #3B82F6;
  margin-top: 0.5rem;
`;

const FitmentScoreText = styled.p`
  font-size: 2.8rem;
  font-weight: 700;
  color: ${props =>
    props.score >= 75
      ? "#22C55E"
      : props.score >= 50
      ? "#F59E0B"
      : "#EF4444"
  };
`;

const SectionContainer = styled.div`
  margin-top: 2rem;
  padding: 1.5rem;
  background-color: #FFFFFF;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #E2E8F0;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1E293B;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
`;

const SkillItem = styled.li`
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.95rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.type === 'matched' ? '#D1FAE5' : '#FEE2E2'};
  color: ${props => props.type === 'matched' ? '#065F46' : '#991B1B'};
  border: 1px solid ${props => props.type === 'matched' ? '#A7F3D0' : '#FECACA'};
`;

const CourseList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CourseListItem = styled.li`
  background-color: #F8FAFC;
  border: 1px solid #E2E8F0;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
`;

const CourseLink = styled.a`
  color: #3B82F6;
  text-decoration: none;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;

const AnalysisText = styled.p`
  line-height: 1.6;
  color: #4B5563;
  font-size: 0.95rem;
`;

// Recharts colors for gauge chart
const GAUGE_COLORS = {
    matched: "#3B82F6", // Blue for matched portion
    remaining: "#E2E8F0" // Light gray for the un-filled portion
};

// Custom Label for the center of the gauge
const GaugeLabel = ({ viewBox, value, color }) => {
    const { cx, cy } = viewBox;
    return (
        <text x={cx} y={cy} fill={color} textAnchor="middle" dominantBaseline="central" fontSize="2rem" fontWeight="700">
            {`${value}%`}
        </text>
    );
};


const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        console.log('Frontend: Raw data parsed from localStorage:', parsed);

        const mappedData = {
          score: parsed.fitmentScore,
          stream: parsed.detectedStream,
          message: parsed.message,
          courses: parsed.courses,
          analysis: parsed.analysis
        };
        console.log('Frontend: Mapped data for state:', mappedData);

        if (
          mappedData?.score !== undefined &&
          mappedData?.analysis &&
          Array.isArray(mappedData.analysis.matchedSkills) &&
          Array.isArray(mappedData.analysis.missingSkills)
        ) {
          setData(mappedData);
          console.log('Frontend: Successfully set data from localStorage.');
          return;
        } else {
          console.warn('Frontend: LocalStorage data is incomplete or malformed for dashboard, falling back to mock data.', mappedData);
        }
      } catch (err) {
        console.error("Frontend: Error parsing dashboard data from localStorage:", err);
      }
    } else {
        console.log('Frontend: No dashboardData found in localStorage, using mock data.');
    }

    // --- FALLBACK MOCK DATA (Only used if no valid data in localStorage) ---
    setData({
      score: 65, // Example score for mock data
      stream: "Full Stack Development - MOCK",
      courses: [
        { course: "Node.js Complete Guide (Mock)", url: "https://example.com/node-course", platform: "Udemy" },
        { course: "MongoDB for Developers (Mock)", url: "https://example.com/mongodb-course", platform: "MongoDB University" },
        { course: "Express.js Crash Course (Mock)", url: "https://example.com/express-course", platform: "YouTube" },
      ],
      message: "This is mock data. To get real analysis, please upload a resume and job description. This profile shows strong frontend skills but missing backend technologies.",
      analysis: {
        jobKeywords: ["javascript", "react", "html", "css", "node.js", "mongodb", "express"],
        resumeKeywords: ["javascript", "react", "html", "css"],
        matchedSkillsCount: 4,
        missingSkillsCount: 3,
        matchedSkills: ["JavaScript (Mock)", "React (Mock)", "HTML (Mock)", "CSS (Mock)"],
        missingSkills: ["Node.js (Mock)", "MongoDB (Mock)", "Express (Mock)"]
      }
    });
  }, []);

  if (!data) {
    return (
      <DashboardWrapper>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', fontSize: '1.25rem', fontWeight: 'medium', color: '#64748B' }}>
          <p>Loading dashboard...</p>
        </div>
      </DashboardWrapper>
    );
  }

  // Calculate percentage for the gauge chart (using fitment score directly for impact)
  const matchedPercentage = data.score;
  const remainingPercentage = 100 - matchedPercentage;

  const gaugeData = [
    { name: 'Matched', value: matchedPercentage },
    { name: 'Remaining', value: remainingPercentage },
  ];

  return (
    <DashboardWrapper>
      <MaxWidthContainer>
        <Header>
          <h1>Skill Match Dashboard</h1>
        </Header>

        <MainGrid>
          {/* Fitment Score Card */}
          <Card>
            <CardHeader>Fitment Score</CardHeader>
            <FitmentScoreText score={data.score}>
              {data.score}%
            </FitmentScoreText>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '0.5rem' }}>
              {data.score >= 75 ? 'Excellent Match!' : data.score >= 50 ? 'Good Potential' : 'Needs Improvement'}
            </p>
          </Card>

          {/* Career Stream Card */}
          <Card>
            <CardHeader leftAlign>
              <FaGraduationCap style={{ color: '#3B82F6' }} /> Career Stream
            </CardHeader>
            <CareerStreamCardContent>
                <CareerStreamText>{data.stream}</CareerStreamText>
            </CareerStreamCardContent>
          </Card>

          {/* Skill Match Breakdown Gauge Chart */}
          <Card style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <CardHeader leftAlign style={{width: '100%', justifyContent: 'flex-start'}}>
              <FaChartPie style={{ color: '#F59E0B' }} /> Skill Match Breakdown
            </CardHeader>
            <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                    <Pie
                        data={gaugeData}
                        dataKey="value"
                        startAngle={180} // Start from the left (bottom-left)
                        endAngle={0}    // End at the right (bottom-right)
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        fill="#8884d8"
                        stroke="none" // Remove stroke for cleaner look
                        labelLine={false}
                    >
                        {gaugeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? GAUGE_COLORS.matched : GAUGE_COLORS.remaining} />
                        ))}
                    </Pie>
                    <Tooltip content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            // Only show for the 'matched' part, or adjust as needed
                            if (payload[0].name === 'Matched') {
                                return (
                                    <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
                                        {`${payload[0].name}: ${payload[0].value}%`}
                                    </div>
                                );
                            }
                        }
                        return null;
                    }} />
                    <text x="50%" y="75%" textAnchor="middle" dominantBaseline="middle" fontSize="2rem" fontWeight="700" fill={GAUGE_COLORS.matched}>
                        {`${matchedPercentage}%`}
                    </text>
                    {/* Add labels for "Matched" and "Missing" below the gauge if desired */}
                    <text x="25%" y="95%" textAnchor="middle" dominantBaseline="middle" fontSize="0.9rem" fill="#3B82F6">Matched</text>
                    <text x="75%" y="95%" textAnchor="middle" dominantBaseline="middle" fontSize="0.9rem" fill="#E2E8F0">Remaining</text>
                </PieChart>
            </ResponsiveContainer>
          </Card>

          {/* Matched Skills */}
          <Card style={{ gridColumn: 'span 1' }}>
            <SectionTitle>
              <FaCheckCircle style={{ color: '#22C55E' }} /> Matched Skills
            </SectionTitle>
            <SkillList>
              {(data.analysis?.matchedSkills || []).map((skill, idx) => (
                <SkillItem key={idx} type="matched">
                  {skill}
                </SkillItem>
              ))}
            </SkillList>
          </Card>

          {/* Missing Skills */}
          <Card style={{ gridColumn: 'span 1' }}>
            <SectionTitle>
              <FaTimesCircle style={{ color: '#EF4444' }} /> Missing Skills
            </SectionTitle>
            <SkillList>
              {(data.analysis?.missingSkills || []).map((skill, idx) => (
                <SkillItem key={idx} type="missing">
                  {skill}
                </SkillItem>
              ))}
            </SkillList>
          </Card>
        </MainGrid>

        {/* Detailed Analysis and Recommended Courses Sections */}
        {data.score < 75 && (
          <MainGrid style={{ marginTop: '2rem' }}>
            <Card style={{ gridColumn: 'span 2' }}>
              <SectionTitle>
                <FaLightbulb style={{ color: '#F59E0B' }} /> Detailed Profile Analysis
              </SectionTitle>
              <AnalysisText>{data.message}</AnalysisText>
            </Card>

            <Card style={{ gridColumn: 'span 1' }}>
              <SectionTitle>
                <FaGraduationCap style={{ color: '#3B82F6' }} /> Recommended Courses
              </SectionTitle>
              <CourseList>
                {(data.courses || []).map((course, idx) => (
                  <CourseListItem key={idx}>
                    <CourseLink
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {course.course}
                    </CourseLink>
                    {course.platform && <span style={{ color: '#64748B', fontSize: '0.85rem' }}>{course.platform}</span>}
                  </CourseListItem>
                ))}
              </CourseList>
            </Card>
          </MainGrid>
        )}
      </MaxWidthContainer>
    </DashboardWrapper>
  );
};

export default DashboardPage;