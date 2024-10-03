import React from 'react';
import { Button, Menu } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Navbar.css'; // Import custom CSS for Navbar styling

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const token = localStorage.getItem('token'); // Check if the user is logged in

  // Navigate to a specific route
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from local storage
    navigate('/'); // Redirect to login page
    window.location.reload();
  };

  return (
    <Menu className="navbar" fixed="top">
      <div className="navbar-content"> {/* Added a container for styling */}
        <Menu.Item className="navbar-header" header>
          <h1>Book Management</h1>
        </Menu.Item>
        <Menu.Menu position='right'> {/* Align buttons to the right */}
          {token ? ( // Check if the user is logged in
            <>
              <Menu.Item>
                <Button primary onClick={() => handleNavigate('/addbook')}>Add Book</Button> 
              </Menu.Item>
              <Menu.Item>
                <Button negative onClick={handleLogout}>Logout</Button> {/* Logout Button */}
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                <Button secondary onClick={() => handleNavigate('/signup')}>Signup</Button>
              </Menu.Item>
              <Menu.Item>
                <Button positive onClick={() => handleNavigate('/login')}>Login</Button>
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </div>
    </Menu>
  );
};

export default Navbar;
