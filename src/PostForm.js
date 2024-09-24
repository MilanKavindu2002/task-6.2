import React, { useState } from 'react';
import PostTypeSelector from './PostTypeSelector';
import ArticleForm from './ArticleForm';
import QuestionForm from './QuestionForm';
import './PostForm.css';

const PostForm = () => {
  const [postType, setPostType] = useState('article'); // Default to 'article'

  return (
    <div className="post-form">
      <h3>New Post</h3>
      <PostTypeSelector setPostType={setPostType} />

      {postType === 'article' && <ArticleForm />}
      {postType === 'question' && <QuestionForm />}
    </div>
  );
};

export default PostForm;
