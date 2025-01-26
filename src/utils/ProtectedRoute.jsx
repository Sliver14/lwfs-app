// // ProtectedRoute.js
// import React, { useState, useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import Modal from '../component/Modal';

// const ProtectedRoute = ({ children }) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const token = Cookies.get('authToken'); // Get token from cookies

//   useEffect(() => {
//     if (!token) {
//       setIsModalOpen(true); // Open the modal if there's no token
//     } 
//   }, [token]);

//   if (!token) {
//     return <Modal />; // Show modal if token is not available
//   }

//   return children; // If token exists, render the children (LiveTv component)
// };

// export default ProtectedRoute;
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Modal from '../component/Modal';

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false); // State to track if the user is authorized
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken'); // Get token from cookies

    if (token) {
      setIsAuthorized(true); // If token exists, user is authorized
    } else {
      setIsModalOpen(true); // Open the modal if there's no token
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Callback to close modal and recheck token
  const handleModalClose = () => {
    const token = Cookies.get('authToken');
    if (token) {
      setIsAuthorized(true); // Recheck if the token exists
      setIsModalOpen(false); // Close the modal
    }
  };

  // Show modal if no token
  if (!isAuthorized) {
    return <Modal onClose={handleModalClose} />;
  }

  // Render child content if authorized
  return children;
};

export default ProtectedRoute;
