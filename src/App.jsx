import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [mode, setMode] = useState("signin"); 

 return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="bg-white  w-full max-w-md text-center">
        <h1 className="text-xl font-bold text-gray-900">Change Log Tool</h1>
        <p className="text-sm text-gray-600 mt-2">
          Sign in to manage your projects and collaborate with your team
        </p>

        {/* Tabs */}
        <div className="flex bg-gray-200 rounded-full overflow-hidden mt-6">
          <button
            className={`flex-1 py-2 font-semibold ${
              mode === "signin"
                ? "bg-white text-gray-900 rounded-full shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setMode("signin")}
          >
            Sign In
          </button>
          <button
            className={`flex-1 py-2 font-semibold ${
              mode === "signup"
                ? "bg-white text-gray-900 rounded-full shadow-sm"
                : "text-gray-600"
            }`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <div className="bg-white mt-6 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
          <div className="text-left mt-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              {mode === "signin" ? "Sign In" : "Sign Up"}
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              {mode === "signin"
                ? "Enter your email and password to access your account"
                : "Create an account to get started"}
            </p>

            <form className="space-y-4">
              {mode === "signup" && (
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>
              )}

              <div className="w-full">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
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

              <button
                type="submit"
                className="w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors"
              >
                {mode === "signin" ? "Sign In" : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default App