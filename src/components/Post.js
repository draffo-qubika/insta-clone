// src/components/Post.js
import React, { useState } from 'react';

export default function Post({ 
  id, 
  username, 
  userAvatar, 
  imageUrl, 
  caption, 
  likes, 
  timePosted, 
  isLiked: initialLiked, 
  isBookmarked: initialBookmarked,
  commentsCount
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [isBookmarked, setIsBookmarked] = useState(initialBookmarked);
  const [likesCount, setLikesCount] = useState(likes);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [useProxy, setUseProxy] = useState(false);
  const [proxyAttempts, setProxyAttempts] = useState(0);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleImageError = (e) => {
    console.error(`❌ Image failed to load for post ${id}:`, e.target.src);
    
    if (!useProxy && imageUrl) {
      console.log(`🔄 Trying proxy for post ${id}`);
      setUseProxy(true);
      setProxyAttempts(1);
      setImageError(false);
    } else if (useProxy && proxyAttempts < 2) {
      console.log(`🔄 Trying backup proxy for post ${id} (attempt ${proxyAttempts + 1})`);
      setProxyAttempts(proxyAttempts + 1);
      setImageError(false);
      // Force re-render by toggling useProxy
      setUseProxy(false);
      setTimeout(() => setUseProxy(true), 100);
    } else {
      console.log(`❌ All proxy attempts failed for post ${id}, using default fallback image`);
      // Use custom default image as fallback
      const fallbackImageUrl = "/default-image.png"; // Custom image from public directory
      
      if (e.target.src !== fallbackImageUrl) {
        console.log(`🖼️ Using custom default fallback image for post ${id}`);
        e.target.src = fallbackImageUrl;
        e.target.alt = "Default Image";
        setImageError(false);
      } else {
        console.log(`❌ Even fallback image failed for post ${id}`);
        setImageError(true);
        setImageLoaded(true);
      }
    }
  };

  const handleImageLoad = () => {
    console.log(`✅ Image loaded successfully for post ${id}`);
    setImageLoaded(true);
  };

  // Check if we have a valid image URL
  const hasValidImage = imageUrl && 
                       imageUrl !== 'null' && 
                       imageUrl !== null && 
                       imageUrl.trim() !== '' &&
                       !imageError;

  // Get the image URL to use
  const getImageSrc = () => {
    if (!hasValidImage) return null;
    
    // Check if we're in production (HTTPS) or development (HTTP)
    const isProduction = window.location.protocol === 'https:';
    
    if (isProduction || useProxy) {
      // Always use proxy in production to avoid Mixed Content errors
      // Also use proxy if direct URL failed in development
      if (useProxy) {
        // Try different proxy services based on attempt count
        switch (proxyAttempts) {
          case 1:
            return `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
          case 2:
            return `https://corsproxy.io/?${encodeURIComponent(imageUrl)}`;
          default:
            return `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
        }
      } else {
        return `https://api.allorigins.win/raw?url=${encodeURIComponent(imageUrl)}`;
      }
    } else {
      // Try direct URL first in development only
      return imageUrl;
    }
  };

  const imageSrc = getImageSrc();

  // Debug logging
  if (hasValidImage) {
    console.log(`🔍 Post ${id} - imageUrl:`, imageUrl);
    console.log(`🔍 Post ${id} - imageSrc:`, imageSrc);
    const isProduction = window.location.protocol === 'https:';
    console.log(`🔍 Post ${id} - isProduction:`, isProduction);
    console.log(`🔍 Post ${id} - useProxy:`, useProxy);
    console.log(`🔍 Post ${id} - proxyAttempts:`, proxyAttempts);
  }

  return (
    <div className="post">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-header-left">
          <img 
            src={userAvatar} 
            alt={username} 
            className="post-avatar"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1494790108755-2616c413b265?w=40&h=40&fit=crop&crop=face";
            }}
          />
          <span className="post-username">{username}</span>
          <span className="post-time">• {timePosted}</span>
        </div>
        <div className="post-header-right">
          <svg className="post-menu-icon" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="1.5"></circle>
            <circle cx="6" cy="12" r="1.5"></circle>
            <circle cx="18" cy="12" r="1.5"></circle>
          </svg>
        </div>
      </div>

      {/* Post Image - Only show if valid image exists */}
      {hasValidImage && (
        <div className="post-image-wrapper">
          {!imageLoaded && (
            <div className="image-loading">
              <div className="loading-placeholder">Loading image...</div>
            </div>
          )}
          <img 
            key={`${id}-${useProxy}-${proxyAttempts}`} // Include proxy state in key to force re-render
            src={imageSrc} 
            alt="Post" 
            className="post-image"
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ display: imageLoaded ? 'block' : 'none' }}
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="post-actions">
        <div className="post-actions-left">
          <button className="post-action-btn" onClick={handleLike}>
            <svg className={`post-action-icon ${isLiked ? 'liked' : ''}`} viewBox="0 0 24 24" fill={isLiked ? '#ed4956' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="post-action-btn">
            <svg className="post-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
          <button className="post-action-btn">
            <svg className="post-action-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16,6 12,2 8,6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
          </button>
        </div>
        <div className="post-actions-right">
          <button className="post-action-btn" onClick={handleBookmark}>
            <svg className={`post-action-icon ${isBookmarked ? 'bookmarked' : ''}`} viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Post Stats */}
      <div className="post-stats">
        <span className="post-likes">{likesCount} likes</span>
      </div>

      {/* Post Caption */}
      <div className="post-caption">
        <span className="post-caption-username">{username}</span>
        <span className="post-caption-text">{caption}</span>
      </div>

      {/* Translation link (for Spanish posts) */}
      {caption.includes('Gracias') && (
        <div className="post-translation">
          <button className="translation-link">See translation</button>
        </div>
      )}

      {/* View Comments */}
      <div className="post-comments">
        <span className="post-comments-link">View all {commentsCount} comments</span>
      </div>

      {/* Add Comment Input */}
      <div className="post-comment-input">
        <input type="text" placeholder="Add a comment..." className="comment-input" />
        <button className="post-emoji-btn">
          <svg className="emoji-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
