import "./signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-backend/config";
import { ErrorContext } from "../../context/ErrorContext";

const Signin = () => {
  const [data, setData] = useState({});
  const { err, setErr } = useContext(ErrorContext);

  const navigate = useNavigate();

  function handleClick(e) {
    let inputChange = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputChange });
  }

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password).then(
        () => navigate("/")
      );
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="signin-container">
      <div className="login-box">
        <div className="chat-title">
          <h1>Ecomiti Chat App</h1>
        </div>

        <div className="login-title">
          <p>Login</p>
        </div>

        <form className="login-form" onSubmit={handleSignin}>
          <div className="input-container">
            <input
              placeholder="Your Email.."
              type="email"
              name="email"
              onChange={handleClick}
            />
          </div>

          <div className="input-container">
            <input
              placeholder="Password.."
              type="password"
              name="password"
              onChange={handleClick}
            />
          </div>

          <div className="login-btn__fill">
            <button>Sign In</button>
          </div>
        </form>
        {err && <span>Invalid email/password</span>}
        <div className="registration-container">
          <p>
            You don't have an account?
            <Link to="/register" className="link">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
