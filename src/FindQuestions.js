import React, { useState, useEffect } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, onSnapshot, collection } from 'firebase/firestore';
import './FindQuestions.css';
import { db } from './firebase'; // Ensure your Firebase config is imported correctly

const FindQuestions = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('title'); // Default filter by title
  const [expandedQuestionId, setExpandedQuestionId] = useState(null);
  const [expandedArticleId, setExpandedArticleId] = useState(null);
  const [answerText, setAnswerText] = useState(''); // For storing the answer input
  const [commentText, setCommentText] = useState(''); // For storing the comment input
  const [modalImage, setModalImage] = useState(null); // For image preview modal
  const [questionList, setQuestionList] = useState([]); // Track live updates for questions
  const [articleList, setArticleList] = useState([]); // Track live updates for articles

  // Fetch questions and articles in real-time from Firebase using onSnapshot
  useEffect(() => {
    const unsubscribeQuestions = onSnapshot(collection(db, 'questions'), (snapshot) => {
      setQuestionList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    const unsubscribeArticles = onSnapshot(collection(db, 'articles'), (snapshot) => {
      setArticleList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    });

    // Clean up the listeners when the component unmounts
    return () => {
      unsubscribeQuestions();
      unsubscribeArticles();
    };
  }, []);

  // Function to open the modal with the clicked image
  const openModal = (imageUrl) => {
    setModalImage(imageUrl);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null);
  };

  // Function to filter questions based on the selected filter type
  const filteredQuestions = questionList.filter(q => {
    if (filterType === 'title') {
      return q.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === 'tags') {
      return q.tags.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === 'date') {
      return q.date.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  // Function to filter articles based on the selected filter type
  const filteredArticles = articleList.filter(a => {
    if (filterType === 'title') {
      return a.title.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === 'tags') {
      return a.tags.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (filterType === 'date') {
      return a.date.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return false;
  });

  // Handle the expansion of question cards
  const handleExpandQuestion = (id) => {
    setExpandedQuestionId(expandedQuestionId === id ? null : id); // Toggle the expanded state
  };

  // Handle the expansion of article cards
  const handleExpandArticle = (id) => {
    setExpandedArticleId(expandedArticleId === id ? null : id); // Toggle the expanded state
  };

  // Handle answer submission and save to Firebase
  const handleSubmitAnswer = async (questionId) => {
    if (answerText.trim()) {
      const questionRef = doc(db, 'questions', questionId);
      const newAnswer = { text: answerText, id: Date.now() };
      await updateDoc(questionRef, {
        answers: arrayUnion(newAnswer) // Add answer to the question
      });
      setAnswerText(''); // Clear the input field
    }
  };

  // Handle answer deletion
  const handleDeleteAnswer = async (questionId, answer) => {
    const questionRef = doc(db, 'questions', questionId);
    await updateDoc(questionRef, {
      answers: arrayRemove(answer) // Remove the selected answer
    });
  };

  // Handle comment submission and save to Firebase for articles
  const handleSubmitComment = async (articleId) => {
    if (commentText.trim()) {
      const articleRef = doc(db, 'articles', articleId);
      const newComment = { text: commentText, id: Date.now() };
      await updateDoc(articleRef, {
        comments: arrayUnion(newComment) // Add comment to the article
      });
      setCommentText(''); // Clear the input field
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (articleId, comment) => {
    const articleRef = doc(db, 'articles', articleId);
    await updateDoc(articleRef, {
      comments: arrayRemove(comment) // Remove the selected comment
    });
  };

  // Handle question deletion in real-time and update the local state
  const handleDeleteQuestion = async (questionId) => {
    const questionRef = doc(db, 'questions', questionId);
    await deleteDoc(questionRef); // Delete the question from Firebase

    // Remove from local state
    setQuestionList((prevQuestions) => prevQuestions.filter(q => q.id !== questionId));
  };

  // Handle article deletion in real-time and update the local state
  const handleDeleteArticle = async (articleId) => {
    const articleRef = doc(db, 'articles', articleId);
    await deleteDoc(articleRef); // Delete the article from Firebase

    // Remove from local state
    setArticleList((prevArticles) => prevArticles.filter(a => a.id !== articleId));
  };

  return (
    <div className="find-questions-page">
      {/* Modal for displaying full-size image */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <span className="close">&times;</span>
          <img className="modal-content" src={modalImage} alt="Full Size" />
        </div>
      )}

      {/* Search Bar, Filter Dropdown, and Back to Home button */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search questions or articles"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Filter Dropdown */}
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="filter-dropdown"
        >
          <option value="title">Filter by Title</option>
          <option value="tags">Filter by Tags</option>
          <option value="date">Filter by Date</option>
        </select>

        <button className="back-button" onClick={() => onNavigate('home')}>Back to Home</button>
      </div>

      <div className="content-container">
        {/* Articles Section */}
        <div className="articles-section">
          <h2>Articles</h2>
          <div className="articles-list">
            {filteredArticles.map(article => (
              <div key={article.id} className="article-card">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt="Article Thumbnail"
                    className="thumbnail-image"
                    onClick={() => openModal(article.imageUrl)} // Open the modal with the full-size image
                  />
                )}
                <h3 onClick={() => handleExpandArticle(article.id)}>{article.title}</h3>
                {expandedArticleId === article.id && (
                  <div className="article-details">
                    <p>{article.abstract}</p>
                    <p>Tags: {article.tags}</p>
                    <p>Date: {article.date}</p>

                    {/* Comments Section */}
                    <h4>Comments:</h4>
                    <ul>
                      {Array.isArray(article.comments) && article.comments.map((comment) => (
                        <li key={comment.id}>
                          {comment.text}
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteComment(article.id, comment)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Comment Submission Section */}
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Write your comment here..."
                    ></textarea>
                    <div className="button-container">
                      <button className="submit-answer-button" onClick={() => handleSubmitComment(article.id)}>
                        Submit Comment
                      </button>
                      <button className="delete-question-button" onClick={() => handleDeleteArticle(article.id)}>
                        Delete Article
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Questions Section */}
        <div className="questions-section">
          <h2>Questions</h2>
          <div className="questions-list">
            {filteredQuestions.map(question => (
              <div key={question.id} className="question-card">
                {question.imageUrl && (
                  <img
                    src={question.imageUrl}
                    alt="Question Thumbnail"
                    className="thumbnail-image"
                    onClick={() => openModal(question.imageUrl)} // Open the modal with the full-size image
                  />
                )}
                <h3 onClick={() => handleExpandQuestion(question.id)}>{question.title}</h3>
                {expandedQuestionId === question.id && (
                  <div className="question-details">
                    <p>{question.description}</p>
                    <p>Tags: {question.tags}</p>
                    <p>Date: {question.date}</p>

                    {/* Answers Section */}
                    <h4>Answers:</h4>
                    <ul>
                      {Array.isArray(question.answers) && question.answers.map((answer) => (
                        <li key={answer.id}>
                          {answer.text}
                          <button
                            className="delete-button"
                            onClick={() => handleDeleteAnswer(question.id, answer)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>

                    {/* Answer Submission Section */}
                    <textarea
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      placeholder="Write your answer here..."
                    ></textarea>
                    <div className="button-container">
                      <button className="submit-answer-button" onClick={() => handleSubmitAnswer(question.id)}>
                        Submit Answer
                      </button>
                      <button className="delete-question-button" onClick={() => handleDeleteQuestion(question.id)}>
                        Delete Question
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindQuestions;
