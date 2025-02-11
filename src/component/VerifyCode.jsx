import React, { useState, useEffect } from 'react'
import axios from "axios";

function VerifyCode() {
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [step, setStep] = useState(1);
    const apiUrl = import.meta.env.VITE_API_URL;

    const signin = async (e) => {
        e.preventDefault();


        try{
            const response = await axios.post(`${apiUrl}/auth/signin`, { email} );
            setStep(2)
        } catch(error){
            
        }
    }

const verifySignin = async (e) => {
        e.preventDefault();

        try{
            const response = await axios.post(`${apiUrl}/auth/verify-signin`, { email, code} );
            
        } catch(error){

        }
    }

  return (
    
    <div className='m-28'>
        {step === 1 &&
        <>
            <input type='text' onChange={(e) => {setEmail(e.target.value)}}/>
            <button onClick={signin}>Sign in</button>
        </>
        }
        {step === 2 && 
        <>
            <input type='text' onChange={(e) => {setEmail(e.target.value)}}/>
            <input type='text' onChange={(e) => {setCode(e.target.value)}}/>
            <button onClick={verifySignin}>Verify</button>
        </>
        }
      
    </div>
  )
}

export default VerifyCode
