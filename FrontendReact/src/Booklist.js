import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Message,Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar'; // Import the Navbar component
import './Booklist.css'; // Import custom CSS

const Booklist = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch books from the server
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/getallbooks', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setBooks(response.data);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('Please Login to See the books');
    }
  };


  // Navigate to a specific route
  const handleNavigate = (path) => {
    navigate(path);
  };
  // Handle book deletion
  const handleDelete = async (isbn) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/user/removebook/${isbn}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        console.log('Book deleted successfully:', isbn);
        fetchBooks(); // Reload books after deletion
      } else {
        console.error(`Failed to delete book: ${response.status}`);
        setError(`Failed to delete book: ${response.status}`);
      }
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('Failed to delete book');
    }
  };

  return (
    <div className="booklist-container">
      <Navbar /> {/* Include the Navbar component here */}
      <h2>Book List</h2>

      {error && <Message negative>{error}</Message>}

      <div className="card-group"> {/* Updated class name for the card container */}
        {books.map((book) => (
          <Card key={book.isbn} className="card"> {/* Added class name for individual cards */}
            <Card.Content>
              <Card.Header><h2>{book.title}</h2></Card.Header>
              <Card.Meta>Author: {book.author}</Card.Meta>
              <Card.Description>Published: {book.pubYear}</Card.Description>
            </Card.Content>
            <Card.Content extra>
            <Button className="primary" onClick={() => handleNavigate(`/updatebook/${book.isbn}`)}>Update</Button>
  <Button className="red" onClick={() => handleDelete(book.isbn)}>Delete</Button>
 
</Card.Content>

          </Card>
        ))}
      </div>
    </div>
  );
};

export default Booklist;
