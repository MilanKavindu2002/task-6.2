import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Firebase Storage functions
import { db, storage } from './firebase'; // Firebase configuration
import './ArticleForm.css';

const ArticleForm = ({ onNavigate, saveArticle }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [articleData, setArticleData] = useState({
    title: '',
    abstract: '',
    content: '',
    tags: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('article-image').click();
  };

  const handleCancelImage = () => {
    setSelectedImage(null);
    setImageUrl('');
    document.getElementById('article-image').value = '';
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      setIsUploading(true);
      const storageRef = ref(storage, `articles/${selectedImage.name}`);
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
      const newArticle = {
        ...articleData,
        imageUrl,
        date: new Date().toISOString(),
      };
      await saveArticle(newArticle);
      alert('Article posted successfully!');
      onNavigate('home');  // Navigate back to home
    } catch (error) {
      console.error('Error saving article:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticleData((prevData) => ({
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
        <p>This section is designed based on the type of the post. For an article, the following section would appear.</p>
      </div>

      <div className="form-field">
        <label htmlFor="article-title">Title:</label>
        <input
          type="text"
          id="article-title"
          name="title"
          placeholder="Enter a descriptive title"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-field">
        <label htmlFor="article-image">Add an image:</label>
        <div className="image-upload">
          <input
            type="file"
            id="article-image"
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
        <label htmlFor="article-abstract">Abstract:</label>
        <textarea
          id="article-abstract"
          name="abstract"
          placeholder="Enter a 1-paragraph abstract"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="article-content">Article Text:</label>
        <textarea
          id="article-content"
          name="content"
          placeholder="Enter the article text"
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="article-tags">Tags:</label>
        <input
          type="text"
          id="article-tags"
          name="tags"
          placeholder="Please add up to 3 tags to describe what your article is about"
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isUploading}>
        Post Article
      </button>
    </form>
  );
};

export default ArticleForm;
