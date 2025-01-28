import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from '../component/Modal';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const apiUrl = 'http://localhost:3001';

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${apiUrl}/auth/verify`, {
          withCredentials: true, // Ensure proper spelling
        });
        // setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Verification failed:', error.message);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Show a loading indicator while verifying the user
  if (loading) return <div>Loading...</div>;

  // If the user is not authenticated, show a modal or redirect
  if (!isAuthenticated) {
    return <Modal />
  }

  // Render the protected route's children if authenticated
  return children;
};

export default ProtectedRoute;
