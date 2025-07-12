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

  useEffect(() => {
    let isMounted = true;
    
    const fetchPosts = async () => {
      console.log('📱 Making ONE API request to fetch posts...');
      
      try {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://34.230.1.222:8080';
        const endpoint = `${apiUrl.replace(/\/$/, '')}/posts`;
        
        console.log('🚀 Fetching from:', endpoint);
        
        let response;
        // PROXY DISABLED - Only direct API call
        response = await axios.get(endpoint);
        console.log('✅ Direct API call successful');
        
        // // PROXY LOGIC COMMENTED OUT
        // try {
        //   // Try direct API call first
        //   response = await axios.get(endpoint);
        //   console.log('✅ Direct API call successful');
        // } catch (corsError) {
        //   console.log('⚠️ CORS error, trying proxy...');
        //   // Fallback to CORS proxy
        //   const proxyEndpoint = `https://api.allorigins.win/get?url=${encodeURIComponent(endpoint)}`;
        //   response = await axios.get(proxyEndpoint);
        //   response.data = JSON.parse(response.data.contents);
        //   console.log('✅ Proxy API call successful');
        // }
        
        if (isMounted) {
          const apiPosts = response.data.posts || [];
          console.log(`📦 Received ${apiPosts.length} posts from API`);
          console.log('📦 API Posts:', apiPosts);
          
          // Transform API posts to match our component structure
          const transformedPosts = apiPosts.map(post => ({
            id: post.id,
            username: `user_${post.id}`,
            userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
            imageUrl: post.image_url, // Use the actual image URL from API
            caption: post.copy || "No caption",
            likes: Math.floor(Math.random() * 1000) + 10,
            timePosted: formatTimeAgo(post.created_at),
            isLiked: false,
            isBookmarked: false,
            commentsCount: Math.floor(Math.random() * 50) + 1
          }));
          
          console.log('📦 Transformed posts:', transformedPosts);
          
          // Debug: Show which posts have images
          transformedPosts.forEach(post => {
            console.log(`🖼️ Post ${post.id} imageUrl:`, post.imageUrl);
            console.log(`🖼️ Post ${post.id} has image:`, !!post.imageUrl);
          });
          
          // Use API posts if available, otherwise fallback
          setPosts(transformedPosts.length > 0 ? transformedPosts : fallbackPosts);
          setLoading(false);
          console.log('✅ Posts loaded successfully');
        }
      } catch (error) {
        console.error('❌ API Error:', error);
        if (isMounted) {
          // Use fallback posts on error
          setPosts(fallbackPosts);
          setLoading(false);
          console.log('✅ Using fallback posts due to API error');
        }
      }
    };

    fetchPosts();
    
    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array - only run once

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
            <button className="footer-link">About</button>
            <button className="footer-link">Help</button>
            <button className="footer-link">Press</button>
            <button className="footer-link">API</button>
            <button className="footer-link">Jobs</button>
            <button className="footer-link">Privacy</button>
            <button className="footer-link">Terms</button>
          </div>
          <div className="footer-row">
            <button className="footer-link">Locations</button>
            <button className="footer-link">Language</button>
            <button className="footer-link">Meta Verified</button>
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