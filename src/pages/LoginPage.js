// Import necessary dependencies and components
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { postLogin } from "../api/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
  // React States
  const [loginSuccess, setLoginSuccess] = useState(false);
  const navigate = useNavigate(); // React Router's navigate function

  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = event.target.elements;

    if (uname.value !== "" && pass.value !== "") {
      // Call the postLogin function to send login credentials
      postLogin({
        email: uname.value,
        password: pass.value
      })
        .then((response) => {
          console.log('Response from server:', response.data);
          if (response.data.access_token) {
            // If login is successful, set the access token in session storage
            sessionStorage.setItem("accessToken", response.data.access_token);
            toast.success('Login Success !', {
              position: toast.POSITION.TOP_RIGHT
            });
            // Redirect to the home page
            navigate("/home");
          } else {
            // If login is unsuccessful, show an error message
            toast.error('Unsuccessful Login !', {
              position: toast.POSITION.TOP_RIGHT
            });
          }
        })
        .catch((error) => {
          console.error('Error during login:', error);
          toast.error('Unsuccessful Login !', {
            position: toast.POSITION.TOP_RIGHT
          });
        });
    } else {
      // If either email or password is empty, show an error message
      toast.error('Unsuccessful Login !', {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  useEffect(() => {
    if (loginSuccess) {
      // After a successful login, navigate to the home page after a delay
      setTimeout(() => {
        navigate("/home");
      }, 1500); // You can adjust the delay time as needed
    }
  }, [loginSuccess]);

  // JSX code for the login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
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
        <h1>Patient Infomation System</h1>
        <h2>Login</h2>
        {renderForm}
      </div>
    </div>
  );
};

export default LoginPage;
