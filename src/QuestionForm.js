import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import { db, storage } from './firebase'; // Import your Firebase configuration
import './QuestionForm.css';

const QuestionForm = ({ onNavigate, saveQuestion }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [questionData, setQuestionData] = useState({
    title: '',
    description: '',
    tags: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('question-image').click();
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    setImageUrl('');
    document.getElementById('question-image').value = '';
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      setIsUploading(true);
      const storageRef = ref(storage, `questions/${selectedImage.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedImage);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          console.error('Image upload failed:', error);
          setIsUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImageUrl(downloadURL);
          setIsUploading(false);
        }
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl) {
      alert('Please upload an image before submitting');
      return;
    }

    try {
      const newQuestion = {
        ...questionData,
        imageUrl,
        date: new Date().toISOString(),
      };
      await saveQuestion(newQuestion);
      alert('Question posted successfully!');
      onNavigate('home');  // Navigate back to home
    } catch (error) {
      console.error('Error saving question:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <div className="grey-bar">
        <p>What do you want to ask or share?</p>
      </div>
      
      {/* Conditional Text */}
      <div className="conditional-text">
        <p>This section is designed based on the type of the post. For a question, the following section would appear.</p>
      </div>

      <div className="form-field">
        <label htmlFor="question-title">Title:</label>
        <input
          type="text"
          id="question-title"
          name="title"
          placeholder="Start your question with how, what, why, etc."
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="question-image">Add an image:</label>
        <div className="image-upload">
          <input
            type="file"
            id="question-image"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="browse-button"
            onClick={triggerFileInput}
          >
            Browse
          </button>
          <button
            type="button"
            className="upload-button"
            onClick={handleUploadImage}
            disabled={!selectedImage || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
        {selectedImage && (
          <div className="image-preview">
            <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
            <button
              type="button"
              className="cancel-button"
              onClick={handleCancelImage}
            >
              Cancel
            </button>
            {imageUrl && <p className="upload-status">Image uploaded successfully</p>}
          </div>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="question-description">Describe your problem:</label>
        <textarea
          id="question-description"
          name="description"
          placeholder="Describe your problem"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="question-tags">Tags:</label>
        <input
          type="text"
          id="question-tags"
          name="tags"
          placeholder="Please add up to 3 tags to describe your question"
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isUploading}>
        Post Question
      </button>
    </form>
  );
};

export default QuestionForm;
