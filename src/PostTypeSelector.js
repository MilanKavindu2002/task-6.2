import React from 'react';
import './PostTypeSelector.css';

const PostTypeSelector = ({ setPostType, onNavigate }) => (
  <div className="post-type-selector">
    {/* New Post Title with grey bar */}
    <div className="grey-bar">
      <h2 className="post-title">New Post</h2>
    </div>

    {/* Select Post Type below the title */}
    <div className="post-type-content">
      <p className="post-type-label">Select Post Type:</p>
      <div className="radio-buttons">
        <label>
          <input type="radio" name="post-type" value="question" onChange={() => setPostType('question')} />
          Question
        </label>
        <label>
          <input type="radio" name="post-type" value="article" onChange={() => setPostType('article')} />
          Article
        </label>
      </div>
    </div>

    {/* Back to Home Button */}
    <button className="back-home-button" onClick={() => onNavigate('home')}>
      Back to Home
    </button>
  </div>
);

export default PostTypeSelector;
