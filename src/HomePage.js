import React from 'react';
import ArticleCard from './ArticleCard';
import TutorialCard from './TutorialCard';
import SubscribeSection from './SubscribeSection';
import Footer from './Footer';

const articles = [
  { img: '1 car.jpeg', title: 'Article 1', description: 'A quick guide to understanding the basics of our topic. Find out the essential concepts and how they work. Great for getting a solid foundation.', rating: Math.random() * (5 - 4) + 4 },
  { img: '2 car.jpg', title: 'Article 2', description: 'Deep dive into more advanced aspects of the subject. Learn cool techniques and see how they’re used. Perfect for boosting your skills.', rating: Math.random() * (5 - 4) + 4 },
  { img: '3 car.jpeg', title: 'Article 3', description: 'Explore the latest trends and ideas in the field. See how these concepts apply in real scenarios. Ideal for staying updated and applying new knowledge.', rating: Math.random() * (5 - 4) + 4 }
];

const tutorials = [
  { img: '1st.jpeg', title: 'Tutorial 1', description: 'Get started with the basics and fundamental concepts. Perfect for beginners who want to learn from scratch.', rating: Math.random() * (5 - 4) + 4 },
  { img: '2nd.jpeg', title: 'Tutorial 2', description: 'Dive deeper into intermediate topics and enhance your skills. Ideal for those with some basic knowledge.', rating: Math.random() * (5 - 4) + 4 },
  { img: '3rd.jpg', title: 'Tutorial 3', description: 'Advanced techniques and expert tips for mastering the subject. Best suited for those looking to refine their skills.', rating: Math.random() * (5 - 4) + 4 }
];

const HomePage = () => (
  <div>
    <div className="photo-container">
      <img src="assets/1.jpg" alt="Description of the photo" className="photo" />
    </div>
    <div className="featured-articles">
      <h2>Featured Articles</h2>
      <div className="article-cards">
        {articles.map(article => <ArticleCard key={article.title} article={article} />)}
      </div>
      <a href="#" className="see-all-articles">See All Articles</a>
    </div>
    <div className="featured-tutorials">
      <h2>Featured Tutorials</h2>
      <div className="tutorial-cards">
        {tutorials.map(tutorial => <TutorialCard key={tutorial.title} tutorial={tutorial} />)}
      </div>
      <a href="#" className="see-all-tutorials">See All Tutorials</a>
    </div>
    <SubscribeSection />
    <Footer />
  </div>
);

export default HomePage;
