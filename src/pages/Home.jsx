import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogIn, setIsLogIn] = useState(true);
  const [isRegister, setIRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    if(!loggedIn){
      setIsModalOpen(true);
    }
  }, []);

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className='home-page'>
       {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>X</button>

            {isLogIn && <>
              <h2>Sign In</h2>
              {/* Add your Login/Register forms here */}
              <form action="">
              <input type="text" placeholder='Email'/>
              {/* <input type="password" placeholder='Password'/> */}
              <button >Sign In</button>
              </form>
              <span onClick={()=>{setIsLogIn(false),setIRegister(true)}}>Create Account</span>
            </>  
            }

            {/* Create Account */}
            {isRegister && <>
              <h2>Create Account</h2>
              <form action="">
              <input type="text" placeholder='Email'/>
              <input type="password" placeholder='Password'/>
              <button >Create Account</button>
              </form>
              <span onClick={()=>{setIsLogIn(true),setIRegister(false)}}>Sign In</span>
            </>  
            }

            
          </div>
        </div>
      )}
     
    </div>
    
  )
}

export default Home
