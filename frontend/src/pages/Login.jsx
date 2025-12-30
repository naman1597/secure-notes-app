import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const url = isRegister
      ? "http://localhost:5000/api/auth/register"
      : "http://localhost:5000/api/auth/login";

    const res = await axios.post(url, { email, password });

    if (!isRegister) {
      login(res.data.token);
    } else {
      alert("Registered successfully. Please login.");
      setIsRegister(false);
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
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 ${
              !isRegister
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 ${
              isRegister
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </div>

        {!isRegister && (
          <p className="text-center text-sm text-blue-500 mt-4 cursor-pointer">
            Forgot password?
          </p>
        )}
      </div>
    </div>
  );
}
