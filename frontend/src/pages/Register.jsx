import axios from "axios";
import { useState } from "react";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error states
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const submit = async () => {
    // reset errors
    setEmailError("");
    setPasswordError("");
    setApiError("");

    let isValid = true;

    // Email validation
    if (!email.includes("@") || !email.includes(".")) {
      setEmailError("Please enter a valid email address");
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    if (!isValid) return;

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      alert("Registration successful. Please login.");
      setEmail("");
      setPassword("");
    } catch (err) {
      setApiError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        {/* Email */}
        <div className="mb-3">
          <input
            className="border p-2 w-full"
            placeholder="Email"
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
            className="border p-2 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && (
            <p className="text-red-600 text-sm mt-1">{passwordError}</p>
          )}
        </div>

        {/* API Error */}
        {apiError && <p className="text-red-600 text-sm mb-2">{apiError}</p>}

        <button
          className="bg-blue-500 text-white w-full p-2 rounded"
          onClick={submit}
        >
          Register
        </button>
      </div>
    </div>
  );
}
