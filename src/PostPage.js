import React from 'react';

const PostPage = ({ onBack }) => (
  <div>
    <header>
      <button onClick={onBack}>Back to Home</button>
    </header>
    <h2>Create a New Post</h2>
    <form>
      <label>
        Title:
        <input type="text" name="title" />
      </label>
      <br />
      <label>
        Content:
        <textarea name="content"></textarea>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default PostPage;
