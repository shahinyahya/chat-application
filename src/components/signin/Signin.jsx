import "./signin.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [data, setData] = useState({});

  function handleClick(e) {
    let inputChange = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputChange });
  }

  return (
    <div className="signin-container">
      <div className="login-box">
        <div className="chat-title">
          <h1>Ecomiti Chat App</h1>
        </div>

        <div className="login-title">
          <p>Login</p>
        </div>

        <form className="login-form">
          <div className="input-container">
            <input
              placeholder="Username.."
              type="name"
              name="username"
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
