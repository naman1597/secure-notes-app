import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSubmit = async () => {
    // reset errors
    setEmailError("");
    setPasswordError("");
    setAuthError("");

    //  REGISTER VALIDATION
    if (isRegister) {
      let isValid = true;

      if (!email.includes("@") || !email.includes(".")) {
        setEmailError("Please enter a valid email address");
        isValid = false;
      }

      if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        isValid = false;
      }

      if (!isValid) return;
    }

    try {
      const url = isRegister
        ? "http://localhost:5000/api/auth/register"
        : "http://localhost:5000/api/auth/login";

      const res = await axios.post(url, { email, password });

      if (isRegister) {
        // register success
        alert("Registered successfully. Please login.");
        setIsRegister(false);
        setEmail("");
        setPassword("");
      } else {
        // login success
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      if (!isRegister) {
        setAuthError("Invalid email or password");
      } else {
        setAuthError("Registration failed. Email may already exist.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white w-96 p-8 rounded shadow">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Secure Notes
        </h2>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => {
              setIsRegister(false);
              setEmail("");
              setPassword("");
              setEmailError("");
              setPasswordError("");
              setAuthError("");
            }}
            className={`flex-1 py-2 ${
              !isRegister ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setIsRegister(true);
              setEmail("");
              setPassword("");
              setEmailError("");
              setPasswordError("");
              setAuthError("");
            }}
            className={`flex-1 py-2 ${
              isRegister ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Email */}
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-red-600 text-sm mt-1">{emailError}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* Auth Error */}
        {authError && <p className="text-red-600 text-sm mb-2">{authError}</p>}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        {!isRegister && (
          <p className="text-center text-sm text-blue-500 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}
      </div>
    </div>
  );
}
