import React from 'react'
import { useState, useEffect } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import Cookies from "js-cookie";
import countryCodes from "../utils/countryCodes.js";
import country from '../utils/country.js';
import zones from "../utils/zones.js";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useLocation, useNavigate, Link, NavLink } from 'react-router-dom';
import process from 'process';


function Modal () {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [code, setCode] = useState("");
  const [step, setStep] = useState("signin");
  // const apiUrl = "http://localhost:3001";
  const apiUrl = "https://lwfs-app-server-production.up.railway.app";
  const previousPage = location.state?.from || "/";
  // if (!isOpen) return null;
  
  const initialValues = {
    // title: "",
    firstName: "",
    lastName: "",
    countryCode: "+234", // Match the code in countryCodes
    phoneNumber: "",
    zone: "",
    country: "Nigeria",
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

    email: Yup.string().email("Invalid email address").required("Email is required"),

    country: Yup.string().required(""),
    
  });

// Function to handle sign-in
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axios.post(`${apiUrl}/auth/signin`, { email });
    const { token } = response.data;

    // Save token to cookies
    Cookies.set("authToken", token, { expires: 30, secure: process.env.NODE_ENV === "production" , sameSite: "strict" });

    setSuccess(response.data.message);
    setIsModalOpen(false);
    setError("");
    setLoggedIn(true);
    window.location.reload();
  } catch (error) {
    console.error("Sign-in error:", error);
    if (error.response?.data?.error.includes('user not verified')){
      const response2 = await axios.post(`${apiUrl}/auth/resend-code`, {email});
      setStep("verify");
    }
    setError(error.response?.data?.error || "Sign-in failed");
    // setLoggedIn(false); // Set loggedIn to false on error
  }finally {
    setLoading(false); // Stop loading
  }
};

//handle signup
const onSubmit = async (data) => {
  setLoading(true);
try {
  const response = await axios.post(`${apiUrl}/auth/signup`, data);
  setStep("verify");
  setSuccess(response.data.message);
  
} catch(error){
  console.error("Already Registered", error);
  if (error.response?.data?.error.includes('User not verified')){
    const response2 = await axios.post(`${apiUrl}/auth/resend-code`, {email});
    setStep("verify");
  }
  setError(error.response?.data?.error || "Error verifiying code");
}finally{
  setLoading(false);
}
}

// Signup verification
const signupVerification = async (e) => {
  e.preventDefault();
  setLoading(true);

  try{
    const response = await axios.post(`${apiUrl}/auth/verify-signup`, { email, code });

    // const { token } = response.data;

    // // Save token to cookies
    // Cookies.set("authToken", token, { expires: 30, secure: process.env.NODE_ENV === "production" , sameSite: "strict" });

    setSuccess(response.data.message);
    setStep("signin");
    setError("");
    // setIsModalOpen(false);
    // // setLoggedIn(true);
    // window.location.reload();
        
  } catch (error){
    setError(error.response?.data?.error || "Verification failed");
  } finally {
    setLoading(false);
  }
}


useEffect(()=>{
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/auth/verify`, {
        withCredentials: true, // Ensure proper spelling
      });
      setLoggedIn(true);  
      setIsModalOpen(false);
      navigate("/");    
    } catch (error) {
      setLoggedIn(false);  
      setIsModalOpen(true);
      console.error('Verification failed:', error.message);
    } finally {
      setLoading(false);
    }
  };

  fetchUserDetails();
},[])

useEffect(() => {
  return () => {
    setError(null);
    setSuccess(null);
  };
},[])

// const openModal = () => {
//   setIsModalOpen(true);
// }

const closeModal = () => {
  setIsModalOpen(false);
  navigate(previousPage);
}

  return (
    <div>
           {/* Modal */}
      {isModalOpen && 
        <div className="flex flex-col fixed top-0 left-0 rigth-0 bottom-0 w-screen h-screen bg-lw_gray justify-center items-center bg-opacity-80 z-50 ">
          
          <div className="relative flex w-[95%] h-[90%] max-w-[650px] justify-center shadow-md items-center bg-white rounded-lg overflow-y-auto">
            
          <div className='flex relative flex-col items-center text-center w-full h-full' >
          <button onClick={closeModal} ><IoCloseSharp className='absolute font-bold text-2xl top-5 right-5'/></button>
             
              {/* Signin */}
            {step === 'signin' && 
              <div className='flex flex-col my-auto  gap-5'>
                <div className='flex justify-center items-center' >
                  <h2 className='text-3xl font-bold ' >Sign In</h2>
                </div>
               
              <div className='flex flex-col items-center' >
                <input onChange={(event) => setEmail(event.target.value)} className='border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black text-lg w-[250px]' type="email" autoComplete="email" placeholder='Email'/>
                <button onClick={handleSubmit} 
                className={`bg-lw_blue mt-5 w-[250px] transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm rounded-md text-white p-2 mb-5 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 text-white"}`} 
                disabled={loading} >{loading ? "Signing In..." : "Sign In"}</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <span onClick={()=>{setStep("signup")}}>New here? <a className="text-blue-500 hover:underline cursor-pointer" >Create Account</a></span>
              </div>
              </div> 
            }

             { step === 'signup' &&
                <div className='flex flex-col absolute top-10'>
                  <div className='flex flex-col justify-center items-center' >
                  <h2 className='text-2xl font-bold ' >Create Account</h2>
              </div>
              <div className='pb-10'>
              <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
              {({ values, handleChange, setFieldValue }) => (
                <Form className="max-w-md mx-auto bg-white  rounded-lg p-6 space-y-4">
                  {/* First Name */}
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className="text-gray-700 font-medium mb-1">
                      First Name
                    </label>
                    <Field
                      id="firstName"
                      name="firstName"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
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
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="lastName" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Country */}
                  <div className="flex flex-col">
                    <label htmlFor="country" className="text-gray-700 font-medium mb-1">
                      Country
                    </label>
                    <Field
                      as="select"
                      name="country"
                      id="country"
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    >
                      <option value="" disabled>
                        Select your country
                      </option>
                      {country.map((country, index) => (
                        <option key={index} value={country}> 
                          {country}
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
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
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
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
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
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="church" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-700 font-medium mb-1">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      value={values.email}
                      // Update Formik's state and external `setEmail`
                      onChange={(e) => {
                        handleChange(e);
                        setEmail(e.target.value); // Update external state
                        setFieldValue("email", e.target.value); // Update Formik state
                      }}
                      
                      className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                    />
                    <ErrorMessage name="email" component="span" className="text-red-500 text-sm mt-1" />
                  </div>

                  {/* Error & Success Messages */}
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  {success && <p className="text-green-500 text-center">{success}</p>}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="bg-lw_blue text-white font-medium rounded-md p-2 mt-4 w-full transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm"
                    disabled={loading}
                  >
                    {loading ? "Registering..." : "Register" }
                  </button>
                </Form>
              )}
              </Formik>

              {/* Already Registered */}
              <span className="block text-center mt-2 text-md">
                    Already registered?{" "}
                    <a
                      onClick={() => setStep("signin")}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      Login
                    </a>
                  </span>

              </div>
                </div>
              }

              { step === 'verify' && 
              <>
                <div className='flex flex-col justify-center items-center mb-10 gap-5' >
                  <h2 className='text-3xl font-bold ' >Check your inbox</h2>
                
                <h2>Enter the verification code sent to {email}</h2>
                <input
                  className='border border-lwfs3 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-black text-md w-[300px]'
                  type="text"
                  onChange={(e) => setCode(e.target.value)}
                />
                <button className={`flex  bg-lw_dark_blue text-white py-2 px-5 flex-grow rounded-sm justify-center w-[300px] transition transform ease-out duration-200 hover:scale-95 hover:shadow-sm ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white"}`} disabled={loading} onClick={signupVerification}>{loading ? "Loading..." : "Continue"}</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>{success}</p>}
                <button className='underline' onClick={() => setStep("resend-code")}>Resend-code</button>
                <div className='flex gap-5 text-lg'>
                  <buttton className='cursor-pointer' onClick={() => setStep("signin")}>Signin</buttton>
                  <buttton className='cursor-pointer' onClick={() => setStep("signup")}>Signup</buttton>
                </div>
                </div>
              </>
              }
            

          </div>
          </div>
        </div>
      }
      
    </div>
  )
}

export default Modal
