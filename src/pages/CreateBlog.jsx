import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBlog.css';

function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    content: '',
    category: 'Technology',
    image: '',
  });
  const [error, setError] = useState('');

  const categories = ['Technology', 'Web Design', 'Programming', 'Business', 'Lifestyle', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }
    if (!formData.author.trim()) {
      setError('Author name is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return;
    }
    if (!formData.content.trim()) {
      setError('Content is required');
      return;
    }

    // Get existing blogs from localStorage
    const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    
    // Create new blog object
    const newBlog = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      description: formData.description,
      content: formData.content,
      category: formData.category,
      image: formData.image || 'https://via.placeholder.com/400x200?text=' + encodeURIComponent(formData.title),
      date: new Date(),
      likes: 0,
      liked: false
    };

    // Add new blog to the array
    const updatedBlogs = [newBlog, ...existingBlogs];
    
    // Save to localStorage
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

    // Reset form
    setFormData({
      title: '',
      author: '',
      description: '',
      content: '',
      category: 'Technology',
      image: '',
    });

    // Show success message and redirect
    alert('Blog published successfully!');
    navigate('/');
  };

  return (
    <div className="create-blog">
      <div className="create-blog-container">
        <h1>Create a New Blog</h1>
        <p className="subtitle">Share your thoughts with the world</p>

        <form className="blog-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="title">Blog Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title for your blog"
              className="form-input"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="author">Author Name *</label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Your name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-input"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Short Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a brief description of your blog"
              rows="3"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Blog Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your full blog content here..."
              rows="10"
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="image">Image URL (Optional)</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="form-input"
            />
            {formData.image && (
              <div className="image-preview">
                <p>Image Preview:</p>
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="publish-btn">
              ✓ Publish Blog
            </button>
            <button 
              type="button" 
              className="cancel-btn"
              onClick={() => navigate('/')}
            >
              ✕ Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBlog;