import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setEmailError("");
    setPasswordError("");
    setApiError("");

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

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        email,
        password,
      });

      alert("Registration successful. Please login.");
      navigate("/");
    } catch (err) {
      setApiError("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Secure Notes</h2>

        {/* Tabs */}
        <div className="flex mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex-1 py-2 bg-gray-200"
          >
            Login
          </button>
          <button className="flex-1 py-2 bg-blue-600 text-white">
            Register
          </button>
        </div>

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

        {apiError && <p className="text-red-600 text-sm mb-2">{apiError}</p>}

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
}
