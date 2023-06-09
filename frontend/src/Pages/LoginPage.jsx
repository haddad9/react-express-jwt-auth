import React, { useState } from "react";
import axios from "axios";
import logo from '../gigih.png';

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [token, setToken] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/register", {
        username,
        password,
      });
      displayNotification(response.data.message); 
    } catch (error) {
      console.error(error);
    }
  };

  const handleCheckJWT = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        const response = await axios.get("http://localhost:8000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        displayNotification(response.data.message);
      } catch (error) {
        console.error(error);
      }
    } else {
      displayNotification("No JWT token available"); // Display a message indicating no token is available
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/login", {
        username,
        password,
      });
      setToken(response.data.token); 
      displayNotification("Logged in successfully!"); // Display a success message
    } catch (error) {
      console.error(error);
      displayNotification("Login failed"); // Display an error message
    }
  };


  const displayNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-64">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" />
        </div>
        <h1 className="text-2xl mb-6 text-center">Login JWT Demo <br/>by Haddad</h1>
        {notification && (
          <div className="bg-green-500 text-white text-center py-2 px-4 mb-4">
            {notification}
          </div>
        )}
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 font-bold">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 font-bold">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-400"
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>

            
            <button
                onClick={handleCheckJWT}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 ml-2 rounded"
            >
                Check JWT
            </button>
            
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
