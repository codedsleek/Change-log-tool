import { useState, useEffect } from 'react'
import './App.css'
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";


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
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one symbol"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
});

function App() {
  const [mode, setMode] = useState("signup"); // default 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
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


  // Handle input changes + validation
  const handleChange = (field, value) => {
    const updatedFormData = { ...formData, [field]: value };
    setFormData(updatedFormData);


  // Per-field validation
  const newErrors = { ...errors }; 

  if (field === "email") {
    const emailSchema = z.string().email("Enter a valid email address");
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      newErrors.email = result.error.errors[0].message;
    } else {
      delete newErrors.email;
    }
  } else if (field === "password" || field === "confirmPassword") {
    const passwordSchema = z.string() 
      
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one symbol")
    
      if (!passwordSchema.safeParse(updatedFormData.password).success) {
        newErrors.password = "Password must be at least 8 chars, include uppercase, number, and symbol";
      } else {
      delete newErrors.password; 
    }
    // ===== Re-validate confirmPassword whenever password changes =====
    if (mode === "signup" && updatedFormData.confirmPassword !== updatedFormData.password) {  // <-- CHANGED
    newErrors.confirmPassword = "Passwords do not match"; // <-- CHANGED
    } else {
      delete newErrors.confirmPassword;
    }
   
  } else if (field === "username") {
    const usernameSchema = z.string().min(3, "Username must be at least 3 characters long");
    const usernameResult = usernameSchema.safeParse(value);
    if (!usernameResult.success) {
      newErrors.username = usernameResult.error.errors[0].message;
    } else  {
      delete newErrors.username; 
    }
  } else if (field === "confirmPassword") {
  // ===== confirmPassword validation =====
    if (updatedFormData.password !== value) {
      newErrors.confirmPassword = "Passwords do not match";
    } else {
      delete newErrors.confirmPassword;
    }
  }


  setErrors(newErrors);

};

  const handleSubmit = (e) => {
    e.preventDefault();

    const activeSchema = mode === "signup" ? signupSchema : signinSchema;
    const result = activeSchema.safeParse(formData);


    if (result.success) {
      if (mode === "signin") {
        // Navigate to Dashboard on successful sign-in
        navigate("/dashboard");
      }
      alert(
        `${mode === "signup" ? "Account created" : "Signed in"} successfully!`
      );
    } else {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      alert("Please fix errors before submitting.");
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
}, [formData, errors, mode]);  // <-- CHANGED: dependencies stay the same







  

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
              onClick={() => handleModeSwitch("signup")}
            >
              Sign Up
            </button>
            <button
              className={`flex-1 py-2 font-semibold ${
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
          <form className="text-left mt-6 space-y-4" onSubmit={handleSubmit}>
            
            <div className="text-left mt-6">
              {/* Username */}
              
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
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
                </div>
              )}
              {/* Email */}
              <div className="w-full mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.email && 
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                }
              </div>
              {/* Password */}
              <div className="w-full mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
              {/* Confirm Password */}
              {mode === "signup" && (
                <div className="w-full mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleChange("confirmPassword", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={!isFormValid}
                className={`w-full py-2 bg-black text-white font-semibold rounded-md hover:bg-gray-800 transition-colors ${
              isFormValid
                ? "bg-black text-white hover:bg-gray-800"
                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
              >
                {mode === "signup" ? "Sign Up" : "Sign In"}
              </button>
              
            </div>
          </form>  
        </div>

        <div className="pt-5">
          <h2 className="text-xs  text-gray-900 mb-1">
            Or Sign up with
          </h2>
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