// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthForm from './component/AuthForm';
import UploadPage from './pages/UploadPage';
import DashboardPage from './pages/DashboardPage';

import GlobalStyle from './GlobalStyle'; // Your global pattern background styles

function App() {
  return (
    <>
      <GlobalStyle /> {/* Apply global background and styles */}
      <Router>
        <Routes>
          <Route path="/" element={<AuthForm />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
