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
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1);
  const PORT = "https://lwfs-app-server-production.up.railway.app/";
  

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

// Function to handle sign-in
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${PORT}/auth/signin`, { email });

    setSuccess(response.data.message);
    setLoggedIn(true); // Set loggedIn to true
    setStep(2);
    // setIsModalOpen(false);
    setError(null); // Clear error
  } catch (err) {
    console.error("Sign-in error:", err);
    setError(err.response?.data?.error || "Sign-in failed");
    setLoggedIn(false); // Set loggedIn to false on error
  }
};

// Signin verification
const signinVerification = async (e) => {
  e.preventDefault();
  
  try{
    const response = await axios.post(`${PORT}/auth/verify-signin`, { email, code });

    const { token } = response.data;

    // Save token to cookies
    Cookies.set("authToken", token, { expires: 30, secure: false, sameSite: "strict" });

    setSuccess(response.data.message);
    setIsModalOpen(false);
  } catch (error){
    setError(error.response?.data?.error || "Verification failed");
  }
}

//handle signup
const onSubmit = async (data) => {
  setError("");
  setSuccess("");
try {
  const response = await axios.post(`${PORT}/auth/signup1` ,data);
  setStep(4);
  setSuccess(response.data.message);
} catch(err){
  console.error("Sign-up error:", err);
  setError(err.response?.data?.error || "Error verifiying code");

}
}

// Signup verification
const signupVerification = async (e) => {
  e.preventDefault();
  
  try{
    const response = await axios.post(`${PORT}/auth/verify-signup`, { email, code });
    setSuccess(response.data.message);
  } catch (error){
    setError(error.response?.data?.error || "Verification failed");
  }
}

// Function to check if a valid token exists
const checkAuthToken = async () => {
  const token = Cookies.get("authToken");
  console.log("Auth token:", token);

  if (!token) {
    setLoggedIn(false); // No token, user is not logged in
    setIsModalOpen(true);
    return;
  }

  try {
    const response = await axios.post(`${PORT}/auth/verify`, { token });

    if (response.status === 200) {
      setLoggedIn(true); // Valid token, user is logged in
      setIsModalOpen(false);
    } 
  
  } catch (error) {
    console.error("Token verification error:", error);
    setLoggedIn(false); // Error in token validation
    setIsModalOpen(true);
  }
};

// Run token check on component mount
useEffect(() => {
  checkAuthToken();
}, []);


//close modal
const closeModal = () => {
  setIsModalOpen(false);
}

  return (
    <div>
           {/* Modal */}
           {isModalOpen && (
        <div className="flex flex-col fixed top-0 left-0 rigth-0 bottom-0 w-screen h-screen bg-lwfs4 justify-center items-center bg-opacity-80 z-50 transition duration-300 ">
          
          <div className="relative flex w-11/12 h-5/6 transition duration-300 justify-center items-center bg-white rounded-lg overflow-y-auto">
            
          <div className='flex flex-col  justify-center items-center text-center w-[100%] h-[100%]  ' >
          <button onClick={closeModal}><IoCloseSharp className='absolute font-bold text-2xl top-5 right-5' /></button>
          
            {step === 1 && <>
                <div className='flex justify-center w-full items-center mb-10 transition duration-300' >
                  <h2 className='text-4xl font-bold ' >Sign In</h2>
                </div>
               {/* Login */}
              <div className='flex flex-col items-center' >
                <input onChange={(event) => setEmail(event.target.value)} className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lwfs2 text-2xl' type="text" placeholder='Email'/>
                <button onClick={handleSubmit} className='bg-lwfs2 w-32 mt-5 rounded-md text-white p-2 mb-5' >Sign In </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <span onClick={()=>{setStep(3)}}>New here? <a className='text-lwfs2 cursor-pointer' >Create Account</a></span>
              </div>
              </> 
            }

            { step === 2 && 
              <>
                <h2>Enter Verification Code</h2>
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={signinVerification}>Verify Code</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button onClick={handleSubmit}>Re-send code</button>
                <buttton onClick={() => {setStep(1)}}>Signin</buttton>
                <buttton onClick={() => {setStep(3)}}>Signup</buttton>
              </>
            }

             { step === 3 &&
                <>
                  <div className='flex justify-center w-full items-center mb-10 ' >
                  <h2 className='text-2xl font-bold ' >Create Account</h2>
              </div>
              <div>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
  <Form className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4">
    {/* First Name */}
    <div className="flex flex-col">
      <label htmlFor="firstName" className="text-gray-700 font-medium mb-1">
        First Name
      </label>
      <Field
        id="firstName"
        name="firstName"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="firstName" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Last Name */}
    <div className="flex flex-col">
      <label htmlFor="lastName" className="text-gray-700 font-medium mb-1">
        Last Name
      </label>
      <Field
        id="lastName"
        name="lastName"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="lastName" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Country Code */}
    <div className="flex flex-col">
      <label htmlFor="countryCode" className="text-gray-700 font-medium mb-1">
        Country Code
      </label>
      <Field
        as="select"
        name="countryCode"
        id="countryCode"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select your country code
        </option>
        {countryCodes.map((country) => (
          <option key={country.name} value={country.code}>
            {country.name} ({country.code})
          </option>
        ))}
      </Field>
      <ErrorMessage name="countryCode" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Phone Number */}
    <div className="flex flex-col">
      <label htmlFor="phoneNumber" className="text-gray-700 font-medium mb-1">
        Phone Number
      </label>
      <Field
        id="phoneNumber"
        name="phoneNumber"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="phoneNumber" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Zone */}
    <div className="flex flex-col">
      <label htmlFor="zone" className="text-gray-700 font-medium mb-1">
        Zone
      </label>
      <Field
        as="select"
        name="zone"
        id="zone"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="" disabled>
          Select your zone
        </option>
        {zones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </Field>
      <ErrorMessage name="zone" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Church */}
    <div className="flex flex-col">
      <label htmlFor="church" className="text-gray-700 font-medium mb-1">
        Church
      </label>
      <Field
        id="church"
        name="church"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="church" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Email */}
    <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-700 font-medium mb-1">
        Email
      </label>
      <Field
        id="email"
        name="email"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ErrorMessage name="email" component="span" className="text-red-500 text-sm mt-1" />
    </div>

    {/* Error & Success Messages */}
    {error && <p className="text-red-500 text-center">{error}</p>}
    {success && <p className="text-green-500 text-center">{success}</p>}

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md p-2 mt-4 w-full"
    >
      Register
    </button>

    {/* Already Registered */}
    <span className="block text-center mt-2 text-sm">
      Already registered?{" "}
      <a
        onClick={() => setStep(1)}
        className="text-blue-500 hover:underline cursor-pointer"
      >
        Login
      </a>
    </span>
  </Form>
              </Formik>

              </div>
                </>
              }

              { step === 4 && 
              <>
                <h2>Enter Verification Code</h2>
                <input type='email' onChange={(e) => setEmail(e.target.value)} />
                <input
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                />
                <button onClick={signupVerification}>Verify Code</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
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
