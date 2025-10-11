import { useState, useEffect } from 'react'
import './App.css'
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGear, faLifeRing, faEye, faEyeSlash, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import logo from './assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";

// Zod schema for validation
const signinSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});


const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Password must include at least one symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

function App() {
  const [mode, setMode] = useState("signup");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const handleModeSwitch = (newMode) => {
    setMode(newMode);
    setFormData(
      newMode === "signup"
        ? { username: "", email: "", password: "", confirmPassword: "" }
        : { email: "", password: "" }
    );
    setErrors({});
  };

  const handleChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);

    const newErrors = { ...errors };

    if (field === "email") {
      const emailSchema = z.string().email("Enter a valid email address");
      const result = emailSchema.safeParse(value);

      if (value.trim() === "") {
        // Empty field clears error
        delete newErrors.email;
      } else if (!result.success) {
        // Invalid email live feedback
        newErrors.email = "Enter a valid email";
      } else {
        // Valid email
        delete newErrors.email;
      }
    } else if (field === "password" || field === "confirmPassword") {
      const passwordSchema = z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must include at least one uppercase letter")
        .regex(/[0-9]/, "Password must include at least one number")
        .regex(/[!@#$%^&*(),.?\":{}|<>]/, "Password must include at least one symbol");

      if (!passwordSchema.safeParse(updatedFormData.password).success) {
        newErrors.password = "Password must be at least 8 chars, include uppercase, number, and symbol";
      } else {
        delete newErrors.password;
      }

      if (mode === "signup" && updatedFormData.confirmPassword !== updatedFormData.password) {
        newErrors.confirmPassword = "Passwords do not match";
      } else {
        delete newErrors.confirmPassword;
      }
    } else if (field === "username") {
      const usernameSchema = z.string().min(3, "Username must be at least 3 characters long");
      const usernameResult = usernameSchema.safeParse(value);
      if (!usernameResult.success) newErrors.username = usernameResult.error.errors[0].message;
      else delete newErrors.username;
    } else if (field === "confirmPassword") {
      if (updatedFormData.password !== value) newErrors.confirmPassword = "Passwords do not match";
      else delete newErrors.confirmPassword;
    }

    setErrors(newErrors);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const activeSchema = mode === "signup" ? signupSchema : signinSchema;
    const result = activeSchema.safeParse(formData);

    if (result.success) {
      if (mode === "signup") {
        setIsSuccess(true); // show success card
      } else {
        navigate("/dashboard");
      }
    } else {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    }
  };

  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    if (mode === "signup") {
      setIsFormValid(
        Object.keys(errors).length === 0 &&
        formData.username &&
        formData.email &&
        formData.password &&
        formData.confirmPassword
      );
    } else {
      setIsFormValid(
        Object.keys(errors).length === 0 &&
        formData.email &&
        formData.password
      );
    }
  }, [formData, errors, mode]);

  return (
  <div className="flex flex-col items-center justify-center min-h-screen ">
    {/*Logo and title */}
    <div className="flex items-center justify-center mb-6">
      <img src={logo} alt="Khronicle Logo" className="w-10 h-10 mr-2" />
      <h1 className="text-3xl text-amber-800">Khronicle</h1>
    </div>

    {/* Auth card */}
    <div className="bg-white mt-2 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
      {!isSuccess ? (
        <>
          <div className="bg-white w-full max-w-md text-center">
            <h1 className="text-left text-xl font-semibold text-gray-900">Welcome to Khronicle</h1>
            <p className="text-left text-m text-gray-400 mt-2 pb-6">
              Start managing your projects log, and collaborate with your teamS
            </p>
      

            {/* Tabs */}
            <div className="flex bg-gray-50 p-1 rounded-sm overflow-hidden mt-2">
              <button
                className={`flex-1 py-2 font-regular cursor-pointer ${
                  mode === "signup"
                    ? "bg-white text-gray-900 rounded-sm shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handleModeSwitch("signup")}
              >
                Sign Up
              </button>
              <button
                className={`flex-1 py-2 font-regular cursor-pointer ${
                  mode === "signin"
                    ? "bg-white text-gray-900 rounded-sm shadow-sm"
                    : "text-gray-600"
                }`}
                onClick={() => handleModeSwitch("signin")}
              >
                Sign In
              </button>
            </div>

            {/* Form */}
            <form className="text-left mt-2 space-y-4" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <div className="w-full mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={(e) => handleChange("username", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
                </div>
              )}

              <div className="w-full mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-800"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="w-full mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-800"
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}

                {/* Forgot Password */}
                {mode === "signin" && (
                  <div className="text-right mt-1">
                    <button
                      type="button"
                      className="text-xs text-amber-800 hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>

              {mode === "signup" && (
                <div className="w-full mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange("confirmPassword", e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-800"
                    />
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2 font-semibold rounded-md transition-colors cursor-pointer ${
                  isFormValid
                    ? "bg-amber-800 text-white hover:bg-amber-900"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                {mode === "signup" ? "Sign Up" : "Sign In"}
              </button>
            </form>
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-xs text-gray-500">Or sign up with</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              className="relative overflow-hidden group flex items-center justify-center w-full py-3 rounded-md bg-gray-200 transition-all duration-500 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faGoogle}
                className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-500"
              />
              <span
                className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-amber-800/80 to-amber-800
                          group-hover:h-full group-hover:opacity-100 opacity-0
                          transition-all duration-500 ease-out"
              ></span>
            </button>

            <button
              type="button"
              className="relative overflow-hidden group flex items-center justify-center w-full py-3 rounded-md bg-gray-200 transition-all duration-500 cursor-pointer"
            >
              <FontAwesomeIcon 
                icon={faTwitter}
                className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-500"
              />
              <span
                className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-amber-800/80 to-amber-800
                          group-hover:h-full group-hover:opacity-100 opacity-0
                          transition-all duration-500 ease-out"
              ></span>
            </button>

            <button
              type="button"
              className="relative overflow-hidden group flex items-center justify-center w-full py-3 rounded-md bg-gray-200 transition-all duration-500 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={faGithub}
                className="relative z-10 w-5 h-5 text-black group-hover:text-white transition-colors duration-500"
              />
              <span
                className="absolute bottom-0 left-0 w-full h-0 bg-gradient-to-t from-amber-800/80 to-amber-800
                          group-hover:h-full group-hover:opacity-100 opacity-0
                          transition-all duration-500 ease-out"
              ></span>
            </button>
          </div>
        </>
      ) : (
        // Success Card 
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center py-12"
            >
              <FontAwesomeIcon
                icon={faFolderOpen}
                className="text-amber-800 mb-6"
                style={{ fontSize: "5rem" }}
              />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Account Created Successfully
              </h2>
              <p className="text-sm text-gray-600 mb-6">Welcome to Khronicle</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-amber-800 text-white rounded-md hover:bg-amber-900 transition-colors duration-300 cursor-pointer"
              >
                Proceed to Dashboard
              </button>
            </motion.div>
          )}
        </AnimatePresence>


      )}
    </div>

    <p className="mt-6 text-xs text-gray-500 text-center max-w-xs mx-auto">
      By proceeding to use <span className="font-semibold text-amber-800">Khronicle</span>, you agree to our <br />
      <a href="#" className="underline hover:text-amber-800 transition-colors">Terms of Service</a> and{" "}
      <a href="#" className="underline hover:text-amber-800 transition-colors">Privacy Policy</a>.
    </p>
  </div>
);
}


export default App
