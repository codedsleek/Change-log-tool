import { useState, useEffect } from 'react'
import './App.css'
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faGear, faLifeRing, faEye, faEyeSlash, faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import logo from './assets/logo.png';
import { motion, AnimatePresence } from "framer-motion";
import { CircleCheckBig } from 'lucide-react';

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

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotStep, setForgotStep] = useState(1);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [isForgotStepValid, setIsForgotStepValid] = useState(false);

  
  const resetForgotPassword = () => {
    setForgotStep(1);
    setForgotEmail("");
    setOtp(["", "", "", "", "", ""]);
    setNewPassword("");
    setConfirmNewPassword("");
    setShowNewPassword(false);
    setShowConfirmNewPassword(false);
    setIsForgotStepValid(false);
  };

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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

  useEffect(() => {
    if (forgotStep === 1) {
      setIsForgotStepValid(/\S+@\S+\.\S+/.test(forgotEmail));
    } else if (forgotStep === 2) {
      setIsForgotStepValid(otp.join("").length === 6);
    } else if (forgotStep === 3) {
      setIsForgotStepValid(
        newPassword.length >= 8 &&
        newPassword === confirmNewPassword
      );
    }
  }, [forgotStep, forgotEmail, otp, newPassword, confirmNewPassword]);


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
                      onClick={() => {
                        setShowForgotPassword(true);
                        setForgotStep(1);
                      }}
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

    {/* Forgot Password Modal */}
    {showForgotPassword && (
     <div 
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs backdrop-opacity z-50 animate-fadeIn"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setShowForgotPassword(false);
            resetForgotPassword();
          } 
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 space-y-5"
        >
          {/* Email input */}
          {forgotStep === 1 && (
            <>
              <h2 className="text-left text-lg text-gray-800">Forgot Password</h2>
              <p className="text-left text-sm text-gray-600">
                Enter your email address and you will receive an OTP:
              </p>
              <input
                type="email"
                placeholder="Email address"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
              />

              <div className="flex w-full gap-3 pt-3">
                <button
                  disabled={!isForgotStepValid}
                  onClick={() => setForgotStep(2)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition 
                    ${isForgotStepValid
                      ? "bg-amber-800 text-white hover:bg-amber-900 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  Next
                </button>

                <button
                  onClick={() => {
                    setShowForgotPassword(false);
                    resetForgotPassword();
                  }}
                  className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-md text-sm hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              </div>


            </>
          )}

          {/* OTP Verification */}
          {forgotStep === 2 && (
            <>
              <h2 className="text-left text-lg  text-gray-800">Forgot Password</h2>
              <p className="text-left text-sm text-gray-600">
                Enter the OTP sent to your email address.
              </p>

              <div className="flex gap-2 mt-3">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, "");
                      const newOtp = [...otp];
                      newOtp[idx] = value;
                      setOtp(newOtp);

                      // Move to next input automatically
                      if (value && idx < otp.length - 1) {
                        const nextInput = document.getElementById(`otp-${idx + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[idx] && idx > 0) {
                        const prevInput = document.getElementById(`otp-${idx - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    onPaste={(e) => {
                      e.preventDefault();
                      const pasted = e.clipboardData.getData("text").replace(/[^0-9]/g, "");
                      if (!pasted) return;
                      const newOtp = [...otp];
                      for (let i = 0; i < otp.length; i++) {
                        newOtp[i] = pasted[i] || "";
                      }
                      setOtp(newOtp);

                      // Focus last filled input
                      const nextIndex = Math.min(pasted.length - 1, otp.length - 1);
                      const nextInput = document.getElementById(`otp-${nextIndex}`);
                      nextInput?.focus();
                    }}
                    className="w-10 h-10 border border-gray-300 text-center rounded-md text-lg focus:outline-none focus:ring-1 focus:ring-amber-800"
                  />
                ))}
              </div>



              <div className="flex w-full gap-3 pt-4">
                <button
                  disabled={!isForgotStepValid}
                  onClick={() => setForgotStep(3)}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition 
                    ${isForgotStepValid
                      ? "bg-amber-800 text-white hover:bg-amber-900 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  Proceed
                </button>
              </div>
            </>
          )}

          {/* New Password */}
          {forgotStep === 3 && (
            <>
              <h2 className="text-left text-lg text-gray-800">Create New Password</h2>
              <p className="text-left text-sm text-gray-600">
                Your password must be at least 8 characters long.
              </p>

              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
                />
                <FontAwesomeIcon
                  icon={showNewPassword ? faEyeSlash : faEye}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              </div>

              <div className="relative">
                <input
                  type={showConfirmNewPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-amber-800"
                />
                <FontAwesomeIcon
                  icon={showConfirmNewPassword ? faEyeSlash : faEye}
                  onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                />
              </div>

              <div className="flex w-full gap-3 pt-4">
                <button
                  disabled={!isForgotStepValid}
                  onClick={() => {
                    if (newPassword.length >= 8 && newPassword === confirmNewPassword) {
                      setShowForgotPassword(false);
                      setShowSuccessPopup(true);
                      setTimeout(() => {
                        setShowSuccessPopup(false);
                        setShowForgotPassword(false);
                        resetForgotPassword();
                      }, 3000);

                    }
                  }}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition 
                    ${isForgotStepValid
                      ? "bg-amber-800 text-white hover:bg-amber-900 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  Save
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    )}
    {/* Success Popup */}
    {showSuccessPopup && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-xs backdrop-opacity  z-50 animate-fadeIn">
        <div className="bg-white rounded-2xl shadow-lg p-6 w-[320px] relative text-center animate-slideDown">
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ✕
          </button>
          <div className="flex flex-col items-center space-y-4">
            <div className="bg-amber-800/20 text-amber-800 rounded-full p-4 animate-bounce">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Password changed successfully</h2>
          </div>
        </div>
      </div>
    )}
  </div>
);
}


export default App
