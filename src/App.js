import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import PromptPage from './components/PromptPage';
import './App.css';

const Sidebar = () => {
  const location = useLocation();
  
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="instagram-logo">Instagram</h1>
      </div>
      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"/>
          </svg>
          <span className="nav-text">Home</span>
        </Link>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="m21 21-4.3-4.3" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-text">Search</span>
        </div>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-text">Explore</span>
        </div>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 3h6l2 4h9a1 1 0 0 1 1 1.17l-1.5 8.5A1 1 0 0 1 17.5 17H9.17a1 1 0 0 1-.98-.8L6 8H4a1 1 0 0 1 0-2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-text">Reels</span>
        </div>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
            <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-text">Messages</span>
        </div>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-text">Notifications</span>
        </div>
        <Link to="/prompt" className={`nav-item ${location.pathname === '/prompt' ? 'active' : ''}`}>
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" stroke="currentColor" strokeWidth="2" fill="none"/>
          </svg>
          <span className="nav-text">AI Prompt</span>
        </Link>
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="nav-text">Dashboard</span>
        </div>
        <div className="nav-item">
          <div className="profile-avatar">
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" alt="Profile" />
          </div>
          <span className="nav-text">Profile</span>
        </div>
      </nav>
      <div className="sidebar-footer">
        <div className="nav-item">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="2"/>
            <line x1="3" y1="18" x2="21" y2="18" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="nav-text">More</span>
        </div>
        <div className="nav-item meta">
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <span className="nav-text">Also from Meta</span>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isPromptPage = location.pathname === '/prompt';

  return (
    <div className="app">
      {!isPromptPage && <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<PromptPage />} />
      </Routes>
    </div>
  );
}

export default App;
