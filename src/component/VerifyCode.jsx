import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';


function VerifyCode() {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter code

  const handleSendCode = async () => {
    try {
      await axios.post("https://lwfs-app-server-production.up.railway.app/auth/send-code", { email });
      setStep(2);
      alert("Verification code sent to your email.");
    } catch (err) {
      console.error(err);
      alert("Failed to send verification code.");
    }
  };

  const handleVerifyCode = async () => {
    try {
      const res = await axios.post("https://lwfs-app-server-production.up.railway.app/auth/verify-code", { email, code });
      alert(res.data.message);
      // Proceed with signup
    } catch (err) {
      console.error(err);
      alert("Invalid or expired code.");
    }
  };

  return (
    <div className='flex flex-col mt-28'>
      {step === 1 ? (
        <>
          <h2>Enter Your Email</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleSendCode}>Send Code</button>
        </>
      ) : (
        <>
          <h2>Enter Verification Code</h2>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <button onClick={handleVerifyCode}>Verify Code</button>
        </>
      )}
    </div>
  )
}

export default VerifyCode



