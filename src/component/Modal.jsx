import React from 'react'
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import countryCodes from "../utils/countryCodes.js";
import zones from "../utils/zones.js";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Modal() {
  const [isModalOpen, setIsModalOpen] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [isRegister, setIRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialValues = {
    // title: "",
    firstName: "",
    lastName: "",
    countryCode: "+234", // Match the code in countryCodes
    phoneNumber: "",
    zone: "",
    church: "",
    // dateOfbirth: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    // title: Yup.string()
    // .required('Title is required') // Make the title mandatory
    // .oneOf(['Pastor', 'Deacon', 'Deaconess', 'Brother', 'Sister'], 'Invalid title selection'), // Restrict to valid options

    firstName: Yup.string().required(""),

    lastName: Yup.string().required(""),

    countryCode: Yup.string().required(""),

    phoneNumber: Yup.string().max(15, "Phone number must not exceed 15 digits")
      .matches(/^\d+$/, "Phone number must contain only numbers")
      .required("Phone number is required"),

    zone: Yup.string().required(""),
      
    church: Yup.string().required(""),

    email: Yup.string().required(""),
    
  });

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
  }

// Function to handle sign-in
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("https://lwfs-app-server-production.up.railway.app/auth/signin", { email });

    const { token } = response.data;

    // Save token to cookies
    Cookies.set("authToken", token, { expires: 30, secure: true, sameSite: "strict" });

    setSuccess(response.data.message);
    setLoggedIn(true); // Set loggedIn to true
    setIsModalOpen(false);
    setError(null); // Clear error
    alert("Sign-in successful!");
  } catch (err) {
    console.error("Sign-in error:", err);
    setError(err.response?.data?.error || "Sign-in failed");
    setLoggedIn(false); // Set loggedIn to false on error
  }
};

//handle signup
const onSubmit = async (data) => {
  setError("");
  setSuccess("");
try {
  const response = await axios.post("https://lwfs-app-server-production.up.railway.app/auth/signup", data);
  setSuccess(response.data.message);
  setIsLogIn(true);
  setIRegister(false);
  alert("Sign-up successful!");
} catch(err){
  console.error("Sign-up error:", err);
  setError(err.response?.data?.error || "Sign-up failed");

}
}


// Function to check if a valid token exists
const checkAuthToken = async () => {
  const token = Cookies.get("authToken");

  if (!token) {
    setLoggedIn(false); // No token, user is not logged in
    setIsModalOpen(true);
    return;
  }

  try {
    const response = await axios.post("https://lwfs-app-server-production.up.railway.app/auth/verify", { token });

    if (response.status === 200) {
      setLoggedIn(true); // Valid token, user is logged in
      setIsModalOpen(false);
    } else {
      setLoggedIn(false); // Invalid token
      setIsModalOpen(true);
    }
  } catch (err) {
    console.error("Token verification error:", err);
    setLoggedIn(false); // Error in token validation
    setIsModalOpen(true);
  }
};

// Run token check on component mount
useEffect(() => {
  checkAuthToken();
}, [loggedIn]);


  return (
    <div>
           {/* Modal */}
           {isModalOpen && (
        <div className="flex flex-col fixed top-0 left-0 rigth-0 bottom-0 w-screen h-screen bg-lwfs4 justify-center items-center bg-opacity-80 z-50 transition duration-300 ">
          
          <div className="relative flex w-11/12 h-5/6 transition duration-300 justify-center items-center bg-white rounded-lg overflow-y-auto">
            
          <div className='flex flex-col  justify-center items-center text-center w-[100%] h-[100%]  ' >
            
            {isLogIn && <>
                <div className='flex justify-center w-full items-center mb-10 transition duration-300' >
                  <h2 className='text-4xl font-bold ' >Sign In</h2>
                  <button onClick={closeModal}>  
                    <IoCloseSharp className='absolute font-bold text-2xl top-5 right-5' />
                  </button>
                </div>
              
               {/* Login */}
              <div className='flex flex-col items-center' >
                <input onChange={(event) => setEmail(event.target.value)} className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lwfs2 text-2xl' type="text" placeholder='Email'/>
                <button onClick={handleSubmit} className='bg-lwfs2 w-32 mt-5 rounded-md text-white p-2 mb-5' >Sign In </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <span onClick={()=>{setIsLogIn(false),setIRegister(true)}}>New here? <a className='text-lwfs2 cursor-pointer' >Create Account</a></span>
              </div>
              
              
            </>  
            }
            
            {/* Create Account */}
            {isRegister && <>
              <div className='flex justify-center w-full items-center mb-10 ' >
                  <h2 className='text-2xl font-bold  ' >Create Account</h2>
                  <button onClick={closeModal}>  
                    <IoCloseSharp className='absolute font-bold text-2xl top-5 right-5' />
                  </button>
              </div>
              <div>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form>
                  <div>
                  <label htmlFor="firstName">First Name </label>
                  <ErrorMessage name="firstName" component="span" />
                  </div>
                  <Field id="firstName" name="firstName" />
                  
                  <div>
                  <label htmlFor="lastName">Last Name </label>
                  <ErrorMessage name="lastName" component="span" />
                  </div>
                  <Field id="lastName" name="lastName" />

                  <div>
                  <label htmlFor="countryCode">Country Code </label>
                  <ErrorMessage name="countryCode" component="span" />
                  </div>
                  <Field as="select" name="countryCode" id="countryCode">
                    <option value="" disabled>
                      Select your country code
                    </option>
                    {countryCodes.map((country) => (
                      <option key={country.name} value={country.code}>
                        {country.name} ({country.code})
                      </option>
                    ))}
                  </Field>
                  <div>

                  <label htmlFor="phoneNumber">Phone Number </label>
                  <ErrorMessage name="phoneNumber" component="span" />
                  </div>
                  <Field id="phoneNumber" name="phoneNumber" />

                  <div>
                  <label htmlFor="zone">Zone </label>
                  <ErrorMessage name="zone" component="span" />
                  </div>
                  <Field as="select" name="zone" id="zone">
                    <option value="" disabled>
                      Select your zone
                    </option>
                    {zones.map((zone) => (
                      <option key={zone} value={zone}>
                        {zone}
                      </option>
                    ))}
                  </Field>
                  
                  <div>
                  <label htmlFor="church">Church </label>
                  <ErrorMessage name="church" component="span" />
                  </div>
                  <Field id="church" name="church" />

                  <div>
                  <label htmlFor="email">Email </label>
                  <ErrorMessage name="email" component="span" />
                  </div>
                  <Field id="email" name="email" />

                  {error && <p style={{ color: "red", alignSelf: "center" }}>{error}</p>}
                	{success && <p style={{ color: "green", alignSelf: "center" }}>{success}</p>}

                  <button type="submit" className='bg-lwfs2 w-32 mt-5 rounded-md text-white p-2 mb-5'>Register</button>
                  
                  <span onClick={()=>{setIsLogIn(true),setIRegister(false)}}>Already registered? <a className='text-lwfs2 cursor-pointer' >Login</a></span>
                </Form>
                
              </Formik>
              </div>
              
            </>  
            }

          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Modal
