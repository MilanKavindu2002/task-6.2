import React from 'react';

const TutorialCard = ({ tutorial }) => (
  <div className="tutorial-card">
    <img src={tutorial.img} alt={tutorial.title} />
    <h3>{tutorial.title}</h3>
    <p>{tutorial.description}</p>
    <div className="rating">
      {'★'.repeat(Math.floor(tutorial.rating))} {'☆'.repeat(5 - Math.floor(tutorial.rating))} ({tutorial.rating})
    </div>
  </div>
);

export default TutorialCard;
