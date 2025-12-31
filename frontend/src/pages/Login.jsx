import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setAuthError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setAuthError("Invalid email or password");
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
          <button className="flex-1 py-2 bg-blue-600 text-white">Login</button>
          <button
            onClick={() => navigate("/register")}
            className="flex-1 py-2 bg-gray-200"
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
        </div>

        {authError && <p className="text-red-600 text-sm mb-2">{authError}</p>}

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded mt-2"
        >
          Login
        </button>
      </div>
    </div>
  );
}
