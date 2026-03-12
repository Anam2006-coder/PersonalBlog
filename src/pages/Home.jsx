import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import './Home.css';

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Initialize with sample data
  useEffect(() => {
    const savedBlogs = localStorage.getItem('blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      const sampleBlogs = [
        {
          id: 1,
          title: 'Getting Started with React',
          description: 'Learn the basics of React and how to build your first component.',
          author: 'John Doe',
          date: new Date('2026-03-01'),
          category: 'Technology',
          content: 'React is a JavaScript library for building user interfaces with reusable components...',
          image: 'https://via.placeholder.com/400x200?text=React+Basics',
          likes: 5,
          liked: false
        },
        {
          id: 2,
          title: 'CSS Grid vs Flexbox',
          description: 'Understand the differences and when to use CSS Grid or Flexbox.',
          author: 'Jane Smith',
          date: new Date('2026-02-28'),
          category: 'Web Design',
          content: 'CSS Grid and Flexbox are both powerful layout tools...',
          image: 'https://via.placeholder.com/400x200?text=CSS+Layouts',
          likes: 8,
          liked: false
        },
        {
          id: 3,
          title: 'JavaScript Tips and Tricks',
          description: 'Improve your JavaScript skills with these useful tips and tricks.',
          author: 'Mike Johnson',
          date: new Date('2026-02-25'),
          category: 'Programming',
          content: 'JavaScript is a versatile language with many hidden features...',
          image: 'https://via.placeholder.com/400x200?text=JavaScript+Tips',
          likes: 12,
          liked: false
        },
      ];
      setBlogs(sampleBlogs);
      localStorage.setItem('blogs', JSON.stringify(sampleBlogs));
    }
  }, []);

  // Filter blogs based on search and category
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          blog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(blogs.map(blog => blog.category))];

  const handleDelete = (blogId) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId);
    setBlogs(updatedBlogs);
    localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
  };

  return (
    <div className="home">
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to BlogHub</h1>
            <p>Discover amazing stories, share your ideas, and connect with readers worldwide</p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="search-section">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search blogs by title or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="category-filter">
            <h3>Categories:</h3>
            <div className="category-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog List Section */}
        <section className="blog-list-section">
          {filteredBlogs.length > 0 ? (
            <>
              <h2>Latest Blogs ({filteredBlogs.length})</h2>
              <div className="blog-grid">
                {filteredBlogs.map(blog => (
                  <BlogCard 
                    key={blog.id} 
                    blog={blog}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="no-blogs">
              <p className="no-blogs-icon">📝</p>
              <p className="no-blogs-text">No blogs found. Try adjusting your search or create a new blog!</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Home;