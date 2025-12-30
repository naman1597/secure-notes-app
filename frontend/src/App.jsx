import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { token } = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(false);

  if (token) return <Dashboard />;

  return showRegister ? (
    <>
      <Register />
      <p
        className="text-center text-blue-500 cursor-pointer"
        onClick={() => setShowRegister(false)}
      >
        Already have an account? Login
      </p>
    </>
  ) : (
    <>
      <Login />
      <p
        className="text-center text-blue-500 cursor-pointer"
        onClick={() => setShowRegister(true)}
      >
        New user? Register
      </p>
    </>
  );
}
