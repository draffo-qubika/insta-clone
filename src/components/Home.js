import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Post';

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

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the API URL from environment variables
        const apiUrl = process.env.REACT_APP_API_URL || 'http://34.230.1.222:8080';
        
        // Try direct API call first, fallback to CORS proxy if needed
        let endpoint = `${apiUrl}/posts`;
        console.log('🔄 Fetching posts from:', endpoint);
        
        let response;
        try {
          response = await axios.get(endpoint);
        } catch (corsError) {
          console.log('⚠️ CORS error detected, trying with proxy...', corsError.message);
          // Fallback to CORS proxy
          endpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl + '/posts')}`;
          console.log('🔄 Fetching with CORS proxy from:', endpoint);
          response = await axios.get(endpoint);
          // Parse the proxied response
          response.data = JSON.parse(response.data.contents);
        }
        
        console.log('✅ API Response:', response.data);
        
        // Handle the actual API response structure
        const apiPosts = response.data.posts || response.data;
        
        // Transform the API response to match our expected format
        const transformedPosts = apiPosts.map(post => ({
          id: post.id,
          username: post.username || "user_" + post.id,
          userAvatar: post.userAvatar || post.user_avatar || "https://images.unsplash.com/photo-1494790108755-2616c413b265?w=40&h=40&fit=crop&crop=face",
          imageUrl: post.imageUrl || post.image_url || post.image, // Don't provide fallback here, let Post component handle it
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
      <div className="loading-container">
        <div className="loading-spinner">Loading posts...</div>
      </div>
    );
  }

  return (
    <>
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
    </>
  );
};

export default Home; 