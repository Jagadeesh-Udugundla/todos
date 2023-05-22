import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Forgotpassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isNumber, setIsNumber] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    const value = event.target.value;
    setOtp(value);
    if (otp.length===6){
      setIsNumber(!isNaN(value));
    }
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`/api/user/email/${email}`);
      setMessage(response.data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <center>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="submit">Check</button>
      </form>

      {message === 'Possword sent succesfully' ? (
        <form>
          <p>opt sent to {email}</p>
          <label>
            OTP:
            <input type="text" value={otp} onChange={handleOtpChange} />
          </label>
          {isNumber ? (
            <div>
              <p>Password sent successfully to {email}</p>
              <Link to='./login' >Click here to go to Login Page</Link>
            </div>
            
          ) : (
            <p>Please enter a valid OTP.</p>
          )}
        </form>
      ) : (
        <p>{message}</p>
      )}
      </center>
    </div>
  );
};

export default Forgotpassword;

