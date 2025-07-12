// src/components/Post.js
import React, { useState } from 'react';

// Demo images for when API images fail or are null
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop", // Mountain landscape
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=600&fit=crop", // Food
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=600&fit=crop", // Beach
  "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=600&fit=crop", // Coffee
  "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=600&h=600&fit=crop", // Ocean
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=600&fit=crop", // Office/workspace
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop", // City
  "https://images.unsplash.com/photo-1574085733277-851d9d856a3a?w=600&h=600&fit=crop", // Technology
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=600&fit=crop", // Programming
  "https://images.unsplash.com/photo-1493612276216-ee3925520721?w=600&h=600&fit=crop"  // Art/creative
];

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
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleImageError = () => {
    // Use a demo image based on the post ID for consistency
    const fallbackImage = DEMO_IMAGES[id % DEMO_IMAGES.length];
    setCurrentImageUrl(fallbackImage);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // Get a demo image if imageUrl is null/undefined
  const getImageUrl = () => {
    if (!imageUrl || imageUrl === 'null' || imageUrl === null) {
      return DEMO_IMAGES[id % DEMO_IMAGES.length];
    }
    return currentImageUrl || imageUrl;
  };

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

      {/* Post Image */}
      <div className="post-image-wrapper">
        {!imageLoaded && (
          <div className="image-loading">
            <div className="loading-placeholder">Loading image...</div>
          </div>
        )}
        <img 
          src={getImageUrl()} 
          alt="Post" 
          className="post-image"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{ display: imageLoaded ? 'block' : 'none' }}
        />
      </div>

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
