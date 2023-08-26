import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "./login.css";
import { postLogin } from "../api/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  // React States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false); // New state for login success


  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;

    if (uname.value !== "" && pass.value !== "") {
      setIsSubmitted(true);
      // Call the getLogin function
      postLogin({
        email: uname.value,
        password: pass.value
      })
        .then((response) => {
          console.log('show me the response', response.data);
          if (response.data.access_token) {
            sessionStorage.setItem("accessToken", response.data.access_token);
            toast.success('Login Success !', {
              position: toast.POSITION.TOP_RIGHT
            });
            navigate("/home")
          } else {
            toast.error('Unsuccessful Login !', {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
    } else {
      toast.error('Unsuccessful Login !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      setTimeout(() => {
        navigate("/home"); // Navigate to home page after a delay
      }, 1500); // You can adjust the delay time as needed
    }
  }, [loginSuccess]);



  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required />
          {/* {renderErrorMessage("uname")} */}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {/* {renderErrorMessage("pass")} */}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">

      <div className="login-form">
        <h1>Login</h1>
        {
          renderForm
        }
      </div>

    </div>
  );
};

export default LoginPage;
