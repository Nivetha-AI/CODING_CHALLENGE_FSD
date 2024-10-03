import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css'; // Import custom CSS

const AddBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    pubYear: '',
    isbn: '' // Include isbn in the state
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/user/addbooks', bookData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/'); // Redirect to book list after successful addition
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="add-book-container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit} className="add-book-form">
        <input
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <input
          name="author"
          placeholder="Author"
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <input
          name="pubYear"
          placeholder="Publication Year"
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <input
          name="isbn"
          placeholder="ISBN"
          onChange={handleInputChange}
          required
          className="form-input"
        />
        <button type="submit" className="submit-button">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
