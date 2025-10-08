import { useState, useEffect } from 'react'
import './App.css'
import Dashboard from "./Dashboard";
import SingleProjectPanel from "./components/SingleProjectPanel";
import SettingsModal from "./components/SettingsModal";

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
  const [showSettings, setShowSettings] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
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
      alert(`${mode === "signup" ? "Account created" : "Signed in"} successfully!`);
      localStorage.setItem("isSignedIn", "true");
      window.location.reload(); // refresh to show dashboard
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
}, [formData, errors, mode]); 

 return (
  <div className="flex items-center justify-center min-h-screen">
    {/* ==========================
         AUTH SCREENS (Sign In / Sign Up)
    =========================== */}
    {!localStorage.getItem("isSignedIn") ? (
      <div className="bg-white mt-6 p-8 rounded-xl shadow-xl w-full max-w-md text-center">
        {/* Your existing Sign In / Sign Up JSX goes here (keep exactly as-is) */}
        {/* ... */}
        <div className="pt-5">
          <h2 className="text-xs text-gray-900 mb-1">Or Sign up with</h2>
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
    ) : (
      /* ==========================
         DASHBOARD / PROJECT PANEL
      =========================== */
      <div className="w-full h-screen bg-gray-50">
        {!selectedProject ? (
          <Dashboard
            onOpenSettings={() => setShowSettings(true)}
            onProjectSelect={setSelectedProject}
          />
        ) : (
          <SingleProjectPanel
            project={selectedProject}
            isOpen={true}
            onClose={() => setSelectedProject(null)}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {/* Shared Settings Modal */}
        <SettingsModal
          open={showSettings}
          onClose={() => setShowSettings(false)}
        />
      </div>
    )}
  </div>
);

}

export default App