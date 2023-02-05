import "./app.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Registration from "./pages/Registeration";
import ChatBox from "./pages/ChatBox";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ChatBox />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
