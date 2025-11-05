import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #2e3a59;
`;

const Card = styled.div`
  background: #1e2638;
  border-radius: 16px;
  padding: 2rem;
  width: 520px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  color: #fff;
`;

const Title = styled.h2`
  margin-bottom: 0.5rem;
  color: #fff;
`;

const Subtitle = styled.p`
  color: #a0aec0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const DropZone = styled.div`
  width: 100%;
  box-sizing: border-box; 
  padding: 1.5rem;
  border: 2px dashed #4a5568;
  border-radius: 10px;
  background: #2d3748;
  text-align: center;
  margin-bottom: 1rem;
  color: #cbd5e0;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #3b475e;
  }
`;

const UploadList = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const FileItem = styled.div`
  background: #4a5568;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
`;

const ProgressBar = styled.div`
  height: 6px;
  background: #2d3748;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 0.5rem;

  div {
    width: ${props => props.width || '0%'};
    height: 100%;
    background: #63b3ed;
    transition: width 0.4s ease;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  box-sizing: border-box; 
  padding: 1.5rem;        
  background: #2d3748;
  color: #e2e8f0;
  border: 1px solid #4a5568;
  border-radius: 10px;     
  font-size: 0.95rem;
  margin-top: 1rem;
  resize: none;
`;


const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  padding: 0.7rem 2rem;
  background-color: ${props => props.cancel ? '#4a5568' : '#3182ce'};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.cancel ? '#2d3748' : '#2b6cb0'};
  }
  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
  }
`;

const Message = styled.p`
  margin-top: 1rem;
  color: ${props => (props.type === 'error' ? '#fc8181' : '#68d391')};
  font-weight: 500;
`;

function UploadPage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a resume file.');
      setMessageType('error');
      return;
    }
    if (!jobDescription.trim()) {
      setMessage('Please provide a job description.');
      setMessageType('error');
      return;
    }

    setMessage('Uploading your resume...');
    setMessageType('');
    setLoading(true);

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('jobDescription', jobDescription);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(`${percent}%`);
        },
      });
      setLoading(false);
      setProgress('100%');
      if (response.status === 200) {
        setMessage('Upload successful!');
        setMessageType('success');
        localStorage.setItem('dashboardData', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        setMessage('Unexpected error during upload.');
        setMessageType('error');
      }
    } catch (err) {
      setLoading(false);
      console.error('Upload error:', err.response?.data || err.message);
      setMessage('An unexpected error occurred.');
      setMessageType('error');
    }
  };

  return (
    <UploadWrapper>
      <Card>
        <Title>Upload File</Title>
        <Subtitle>Drag and drop file here or choose file</Subtitle>
        <DropZone onClick={() => document.getElementById('fileInput').click()}>
          {file ? file.name : 'Click to select a resume (PDF/DOCX)'}
        </DropZone>
        <input
          id="fileInput"
          type="file"
          accept=".pdf,.docx"
          onChange={(e) => {
            setFile(e.target.files[0]);
            setProgress('0%');
            setMessage('');
            setMessageType('');
          }}
          style={{ display: 'none' }}
        />

        {file && (
          <UploadList>
            <FileItem>
              <div>
                <strong>{file.name}</strong>
              </div>
              <div>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
            </FileItem>
            <ProgressBar width={progress}>
              <div></div>
            </ProgressBar>
          </UploadList>
        )}

        <TextArea
          placeholder="Paste job description here..."
          rows="4"
          value={jobDescription}
          onChange={(e) => {
            setJobDescription(e.target.value);
            setMessage('');
            setMessageType('');
          }}
        />

        <ButtonRow>
          <Button cancel onClick={() => window.location.reload()}>Cancel</Button>
          <Button onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Confirm'}
          </Button>
        </ButtonRow>

        {message && <Message type={messageType}>{message}</Message>}
      </Card>
    </UploadWrapper>
  );
}

export default UploadPage;