import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Firebase configuration
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import Header from './Header';
import SignOutPage from './SignOutPage';
import ArticleForm from './ArticleForm';
import QuestionForm from './QuestionForm';
import PostTypeSelector from './PostTypeSelector';
import FindQuestions from './FindQuestions'; // Component for finding questions and articles

const App = () => {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);
  const [justLoggedOut, setJustLoggedOut] = useState(false);
  const [postType, setPostType] = useState(null); // To track post type selection
  const [questions, setQuestions] = useState([]); // Store questions list
  const [articles, setArticles] = useState([]);   // Store articles list
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  // Fetch questions and articles from Firestore when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questionSnapshot = await getDocs(collection(db, 'questions'));
        setQuestions(questionSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    const fetchArticles = async () => {
      try {
        const articleSnapshot = await getDocs(collection(db, 'articles'));
        setArticles(articleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching articles: ", error);
      }
    };

    fetchQuestions();
    fetchArticles();
  }, []);

  // Save new question or article to Firestore
  const saveQuestion = async (questionData) => {
    try {
      const docRef = await addDoc(collection(db, 'questions'), questionData);
      setQuestions([...questions, { id: docRef.id, ...questionData }]); // Add new question locally
      setSuccessMessage('Question uploaded successfully!');
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  const saveArticle = async (articleData) => {
    try {
      const docRef = await addDoc(collection(db, 'articles'), articleData);
      setArticles([...articles, { id: docRef.id, ...articleData }]); // Add new article locally
      setSuccessMessage('Article uploaded successfully!');
    } catch (error) {
      console.error("Error adding article: ", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, 'questions', id));
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  const handleDeleteArticle = async (id) => {
    try {
      await deleteDoc(doc(db, 'articles', id));
      setArticles(articles.filter(a => a.id !== id));
    } catch (error) {
      console.error("Error deleting article: ", error);
    }
  };

  const handleNavigate = (newPage) => {
    setPage(newPage);
    setSuccessMessage(''); // Clear success message on navigation
  };

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setJustLoggedOut(false);
    handleNavigate('home');
  };

  const handleLogout = () => {
    setUser(null);
    setJustLoggedOut(true);
    handleNavigate('login');
  };

  return (
    <div className="app-container">
      {/* Header Section */}
      {page === 'home' && (
        <Header
          user={user}
          onLogin={() => handleNavigate('login')}
          onLogout={handleLogout}
          onPost={() => handleNavigate('post')}
          onFindQuestions={() => handleNavigate('find-questions')} // Navigation to "Find Questions"
        />
      )}

      {/* Login Page */}
      {page === 'login' && <LoginPage onNavigate={handleNavigate} setUser={handleLogin} justLoggedOut={justLoggedOut} />}
      
      {/* Sign Up Page */}
      {page === 'signup' && <SignUpPage onNavigate={handleNavigate} />}
      
      {/* Sign Out Page */}
      {page === 'signout' && <SignOutPage user={user} onLogout={handleLogout} onNavigate={handleNavigate} />}
      
      {/* Home Page */}
      {page === 'home' && <HomePage questions={questions} articles={articles} />}
      
      {/* Post Page */}
      {page === 'post' && (
        <div>
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Success Message */}
          <PostTypeSelector setPostType={setPostType} onNavigate={handleNavigate} />
          {postType === 'article' && <ArticleForm saveArticle={saveArticle} onNavigate={handleNavigate} />}
          {postType === 'question' && <QuestionForm saveQuestion={saveQuestion} onNavigate={handleNavigate} />}
        </div>
      )}

      {/* Find Questions Page */}
      {page === 'find-questions' && (
        <FindQuestions
          questions={questions}
          articles={articles}
          onDeleteQuestion={handleDeleteQuestion}
          onDeleteArticle={handleDeleteArticle}
          onNavigate={handleNavigate} // Pass onNavigate to FindQuestions
        />
      )}
    </div>
  );
};

export default App;
