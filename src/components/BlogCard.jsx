import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './BlogCard.css';

function BlogCard({ blog, onDelete }) {
  const [isLiked, setIsLiked] = useState(blog.liked || false);
  const [likeCount, setLikeCount] = useState(blog.likes || 0);

  const handleLike = (e) => {
    e.preventDefault();
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this blog?')) {
      onDelete(blog.id);
    }
  };

  return (
    <Link to={`/blog/${blog.id}`} className="blog-card-link">
      <div className="blog-card">
        {blog.image && (
          <div className="blog-image">
            <img src={blog.image} alt={blog.title} />
            {blog.category && (
              <span className="blog-category">{blog.category}</span>
            )}
          </div>
        )}
        
        <div className="blog-content">
          <h3 className="blog-title">{blog.title}</h3>
          
          <p className="blog-description">{blog.description}</p>
          
          <div className="blog-meta">
            <span className="blog-author">✍️ {blog.author}</span>
            <span className="blog-date">📅 {new Date(blog.date).toLocaleDateString()}</span>
          </div>
          
          <div className="blog-footer">
            <button 
              className={`like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              title="Like this blog"
            >
              ❤️ {likeCount}
            </button>
            
            <div className="action-buttons">
              <button 
                className="read-more-btn"
                onClick={(e) => e.preventDefault()}
              >
                Read More →
              </button>
              <button 
                className="delete-btn"
                onClick={handleDelete}
                title="Delete this blog"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;