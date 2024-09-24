import React, { useState } from 'react';
import PostTypeSelector from './PostTypeSelector';
import QuestionForm from './QuestionForm';
import ArticleForm from './ArticleForm';
import './PostPage.css';

const PostPage = () => {
  const [postType, setPostType] = useState('question');

  return (
    <div className="post-page">
      <h2>New Post</h2>
      <PostTypeSelector setPostType={setPostType} />
      {postType === 'question' ? <QuestionForm /> : <ArticleForm />}
    </div>
  );
};

export default PostPage;
