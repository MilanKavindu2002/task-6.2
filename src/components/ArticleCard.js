import React from 'react';

const ArticleCard = ({ article }) => (
  <div className="article-card">
    <img src={article.img} alt={article.title} />
    <h3>{article.title}</h3>
    <p>{article.description}</p>
    <div className="rating">
      {'★'.repeat(Math.floor(article.rating))} {'☆'.repeat(5 - Math.floor(article.rating))} ({article.rating})
    </div>
  </div>
);

export default ArticleCard;
