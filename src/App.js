// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './components/Post';
import './App.css';

// Example posts data as fallback
const fallbackPosts = [
  {
    id: 1,
    username: "martinpennacchia26",
    userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    imageUrl: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=600&h=600&fit=crop",
    caption: "Gracias por acompañarme ❤️😊",
    likes: 30,
    timePosted: "1d",
    isLiked: false,
    isBookmarked: false,
    commentsCount: 4
  },
  {
    id: 2,
    username: "nature_photography",
    userAvatar: "https://images.unsplash.com/photo-1494790108755-2616c413b265?w=40&h=40&fit=crop&crop=face",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
    caption: "Beautiful sunrise over the mountains 🌅 #nature #photography #sunrise",
    likes: 1234,
    timePosted: "2h",
    isLiked: false,
    isBookmarked: false,
    commentsCount: 23
  },
  {
    id: 3,
    username: "foodie_adventures",
    userAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop",
    caption: "Homemade pasta with fresh ingredients 🍝 Recipe coming soon!",
    likes: 892,
    timePosted: "5h",
    isLiked: true,
    isBookmarked: false,
    commentsCount: 12
  }
];

// Suggested users data
const suggestedUsers = [
  {
    id: 1,
    username: "camibg_",
    name: "Followed by moralesbang + 6...",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c413b265?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 2,
    username: "escrotocablecolor",
    name: "Followed by acuarelaycarolina...",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 3,
    username: "adrianporta",
    name: "Followed by vir.izumi + 5 more",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 4,
    username: "melisastupnik",
    name: "Followed by tinchoallegari +...",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=40&h=40&fit=crop&crop=face"
  },
  {
    id: 5,
    username: "instagram",
    name: "Followed by escueladeimpro ...",
    avatar: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=40&h=40&fit=crop&crop=face",
    verified: true
  }
];

// Function to format time ago
const formatTimeAgo = (dateString) => {
  const now = new Date();
  const postDate = new Date(dateString);
  const diffInHours = Math.floor((now - postDate) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return "now";
  if (diffInHours < 24) return `${diffInHours}h`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  return `${diffInWeeks}w`;
};

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use relative URL to leverage the proxy configuration
        const apiUrl = '/posts';
        console.log('🔄 Fetching posts from:', apiUrl);
        
        const response = await axios.get(apiUrl);
        console.log('✅ API Response:', response.data);
        
        // Handle the actual API response structure
        const apiPosts = response.data.posts || response.data;
        
        // Transform the API response to match our expected format
        const transformedPosts = apiPosts.map(post => ({
          id: post.id,
          username: post.username || "user_" + post.id,
          userAvatar: post.userAvatar || post.user_avatar || "https://images.unsplash.com/photo-1494790108755-2616c413b265?w=40&h=40&fit=crop&crop=face",
          imageUrl: post.imageUrl || post.image_url || post.image,
          caption: post.caption || post.copy || "",
          likes: post.likes || Math.floor(Math.random() * 1000),
          timePosted: post.timePosted || formatTimeAgo(post.created_at),
          isLiked: post.isLiked || false,
          isBookmarked: post.isBookmarked || false,
          commentsCount: post.commentsCount || Math.floor(Math.random() * 50)
        }));
        
        console.log('✅ Transformed Posts:', transformedPosts);
        setPosts(transformedPosts);
      } catch (err) {
        console.error('❌ Error fetching posts:', err);
        console.error('❌ Error details:', {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
          headers: err.response?.headers
        });
        
        setError(`${err.message} ${err.response?.status ? `(${err.response.status})` : ''}`);
        // Use fallback posts if API fails
        setPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner">Loading posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="instagram-logo">Instagram</h1>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-item active">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 23h-6.001a1 1 0 0 1-1-1v-5.455a2.997 2.997 0 1 0-5.993 0V22a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V11.543a1.002 1.002 0 0 1 .31-.724l10-9.543a1.001 1.001 0 0 1 1.38 0l10 9.543a1.002 1.002 0 0 1 .31.724V22a1 1 0 0 1-1 1Z"/>
            </svg>
            <span className="nav-text">Home</span>
          </div>
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
          <div className="nav-item">
            <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <circle cx="9" cy="9" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
              <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
            <span className="nav-text">Create</span>
          </div>
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

      {/* Main Content */}
      <div className="main-content">
        <div className="feed">
          {error && (
            <div className="error-message">
              <p>⚠️ API Error: {error}</p>
              <p>Showing fallback posts instead.</p>
              <details className="error-details">
                <summary>Debug Info</summary>
                <p>Check browser console for detailed error logs</p>
              </details>
            </div>
          )}
          {posts.map(post => (
            <Post key={post.id} {...post} />
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="suggestions-section">
          <div className="suggestions-header">
            <h3>Suggested for you</h3>
            <button className="see-all-btn">See All</button>
          </div>
          <div className="suggestions-list">
            {suggestedUsers.map(user => (
              <div key={user.id} className="suggestion-item">
                <div className="suggestion-left">
                  <img src={user.avatar} alt={user.username} className="suggestion-avatar" />
                  <div className="suggestion-info">
                    <div className="suggestion-username">
                      {user.username}
                      {user.verified && <span className="verified-badge">✓</span>}
                    </div>
                    <div className="suggestion-name">{user.name}</div>
                  </div>
                </div>
                <button className="follow-btn">Follow</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-row">
            <a href="#">About</a>
            <a href="#">Help</a>
            <a href="#">Press</a>
            <a href="#">API</a>
            <a href="#">Jobs</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
          <div className="footer-row">
            <a href="#">Locations</a>
            <a href="#">Language</a>
            <a href="#">Meta Verified</a>
          </div>
          <div className="footer-copyright">
            © 2025 INSTAGRAM FROM META
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
