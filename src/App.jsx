import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";


function App() {
  const [mode, setMode] = useState("signin"); 

  // Form state
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
  const newErrors = {};

  // Username check
  if (!username.trim()) {
    newErrors.username = "Username is required.";
  }

  // Full name check (signup only)
  if (mode === "signup" && !fullName.trim()) {
    newErrors.fullName = "Full name is required.";
  }


  // Email check
  if (!email) {
    newErrors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    newErrors.email = "Enter a valid email address.";
  }

  // Password check
  if (!password) {
    newErrors.password = "Password is required.";
  } else if (password.length < 8) {
    newErrors.password = "Password must be at least 8 characters long.";
  } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    newErrors.password = "Password must include at least one symbol.";
  }

  // Confirm password (signup only)
  if (mode === "signup" && confirmPassword !== password) {
    newErrors.confirmPassword = "Passwords do not match.";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0; 
};

const handleSubmit = (e) => {
  e.preventDefault();
  if (validate()) {
    alert(`${mode === "signin" ? "Signed in" : "Account created"} successfully!`);
    // TODO: send data to backend
  }
};


  

 return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white mt-6 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
      
        <div className="bg-white  w-full max-w-md text-center">
          <h1 className="text-left text-xl font-bold text-gray-900">Welcome to Khronicle</h1>
          <p className="text-left text-sm text-gray-600 mt-2">
            Start managing your projects log, and collaborate with your team
          </p>

          {/* Tabs */}
          <div className="flex bg-gray-200 rounded-sm overflow-hidden mt-6">
            <button
              className={`flex-1 py-2 font-semibold ${
                mode === "signup"
                  ? "bg-white text-gray-900 rounded-sm shadow-sm"
                  : "text-gray-600"
              }`}
              onClick={() => setMode("signup")}
            >
              Sign Up
            </button>
            <button
              className={`flex-1 py-2 font-semibold ${
                mode === "signin"
                  ? "bg-white text-gray-900 rounded-sm shadow-sm"
                  : "text-gray-600"
              }`}
              onClick={() => setMode("signin")}
            >
              Sign In
            </button>
          </div>


          {/* Form */}
          <form className="text-left mt-6 space-y-4" onSubmit={handleSubmit}>
            
            <div className="text-left mt-6">
              <form className="space-y-4">
                {mode === "signup" && (
                  <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}

                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                {mode === "signup" && (
                  <div className="w-full">
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      placeholder="Re-enter your password"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                )}

                

                <button
                  type="submit"
                  className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
                >
                  {mode === "signup" ? "Sign Up" : "Sign In"}
                </button>
              </form>
            </div>
          </form>  
        </div>

        <div className="pt-5">
          <h2 className="text-xs  text-gray-900 mb-1">
            Or Sign up with
          </h2>
          <div className="icons">
            <div className=""></div>
          </div>

        </div>
        
        <div className="flex items-center justify-center space-x-6 mt-6">
          <button type="button" className="p-2 rounded-full hover:bg-gray-100">
            <FontAwesomeIcon icon={faGoogle} className="w-6 h-6 text-black" />
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-gray-100">
            <FontAwesomeIcon icon={faGithub} className="w-6 h-6 text-black" />
          </button>
          <button type="button" className="p-2 rounded-full hover:bg-gray-100">
            <FontAwesomeIcon icon={faTwitter} className="w-6 h-6 text-black" />
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default App