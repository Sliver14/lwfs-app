import React from 'react'
import Cookies from "js-cookie";

function Platforms() {
  const logout = () => {
    // Remove the authToken cookie
  Cookies.remove("authToken");

  // Optionally, reset any state related to authentication
  setIsModalOpen(true);
  }
  return (
    <div className='mt-32'>
      {/* Explore our platforms (slides) */}
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Platforms
