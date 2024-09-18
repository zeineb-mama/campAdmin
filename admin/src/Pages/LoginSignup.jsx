import React, { useState } from "react";
import "./CSS/LoginSignup.css";
import axios from 'axios';
import { backend_url } from "../App";

const LoginSignup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await axios.get(`${backend_url}/api/auth/user`, {
        headers: { 'auth-token': token }
      });
      return response.data.user;
    } catch (error) {
      console.error('Failed to fetch user details:', error);
      throw error;
    }
  };

  const handleRedirect = async () => {
    try {
      const user = await fetchUserDetails();
      if (user.role === 'admin') {
        window.location.replace('/')
      } else {
        alert('please try with correct email/password');
      }
    } catch (error) {
      alert('Failed to fetch user details');
    }
  };

  const login = async () => {
    try {
      const response = await axios.post(`${backend_url}/api/auth/login`, formData);
      localStorage.setItem('auth-token', response.data.token);
      await handleRedirect();
    } catch (error) {
      alert("Login failed: " + error.response.data.errors);
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Login</h1>
        <div className="loginsignup-fields">
          <input type="email" placeholder="Email address" name="email" value={formData.email} onChange={changeHandler} />
          <input type="password" placeholder="Password" name="password" value={formData.password} onChange={changeHandler} />
        </div>
        <button onClick={login}>Continue</button>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
