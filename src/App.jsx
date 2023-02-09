import "./app.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registeration";
import ChatBox from "./pages/ChatBox";
import { ErrorContext } from "./context/ErrorContext";
import { useState, useEffect, useContext } from "react";

function App() {
  // const navigate = useNavigate();

  // useEffect(() => navigate("/login"), [navigate]);

  const [err, setErr] = useState(false);
  return (
    <>
      <ErrorContext.Provider value={{ err, setErr }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ChatBox />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </ErrorContext.Provider>
    </>
  );
}

export default App;
