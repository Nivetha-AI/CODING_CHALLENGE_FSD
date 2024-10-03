
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateBook.css'; // Import the CSS file

const UpdateBook = () => {
  const { isbn } = useParams();
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    pubYear: ''
  });
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookDetails();
  }, [isbn]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/user/getbooksbyisbn/${isbn}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setBookData(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/user/updatebook/${isbn}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        params: {
          ...bookData
        }
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="update-book-container"> {/* Add class here */}
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={bookData.title} placeholder="Title" onChange={handleInputChange} />
        <input name="author" value={bookData.author} placeholder="Author" onChange={handleInputChange} />
        <input name="pubYear" value={bookData.pubYear} placeholder="Publication Year" onChange={handleInputChange} />
        <button type="submit">Update Book</button>
      </form>
    </div>
);

};

export default UpdateBook;
