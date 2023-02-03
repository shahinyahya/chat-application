import "../signin/signin.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState({});

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
          <p>Register</p>
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
              placeholder="Email.."
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

          <div className="file-upload-container">
            <img src={avatar ? avatar : ""} alt="" width="80" height="80" />
            <input
              className="avatar-file"
              type="file"
              name="avatar"
              onChange={(e) => {
                setAvatar(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>

          <div className="login-btn__fill">
            <button>Sign Up</button>
          </div>
        </form>
        <div className="registration-container">
          <p>
            You do have an account?{" "}
            <Link to="/" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
