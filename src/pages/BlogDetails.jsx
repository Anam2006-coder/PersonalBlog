import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BlogDetails.css';

function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const foundBlog = blogs.find(b => b.id === parseInt(id));
    if (foundBlog) {
      setBlog(foundBlog);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!blog) {
    return (
      <div className="blog-details-container">
        <div className="not-found">
          <p className="not-found-icon">😕</p>
          <p className="not-found-text">Blog not found</p>
          <button className="back-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-details">
      <div className="blog-details-container">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>

        {blog.image && (
          <div className="blog-header-image">
            <img src={blog.image} alt={blog.title} />
            {blog.category && (
              <span className="blog-category-tag">{blog.category}</span>
            )}
          </div>
        )}

        <article className="blog-article">
          <header className="blog-header">
            <h1 className="blog-detail-title">{blog.title}</h1>
            
            <div className="blog-meta-info">
              <div className="meta-item">
                <span className="meta-label">Author:</span>
                <span className="meta-value">✍️ {blog.author}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Published:</span>
                <span className="meta-value">📅 {new Date(blog.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Category:</span>
                <span className="meta-value">🏷️ {blog.category || 'Uncategorized'}</span>
              </div>
            </div>
          </header>

          <div className="blog-content-full">
            <h2>Blog Content</h2>
            <p>{blog.content}</p>
          </div>

          <div className="blog-interaction">
            <button className="like-btn-large">
              ❤️ {blog.likes || 0} Likes
            </button>
            <button className="share-btn">
              📤 Share
            </button>
          </div>
        </article>

        <div className="blog-related">
          <h3>Other Blogs</h3>
          <p className="related-info">Check out more amazing blogs on the home page!</p>
          <button className="back-home-btn" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;