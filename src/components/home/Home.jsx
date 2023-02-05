import "./home.css";
import Profile from "../../assets/recent-post-1.jpeg";
import Chat from "../chat/Chat";
import Message from "../message/Message";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const [searchUser, setSearchUser] = useState("");

  const handleChange = (e) => {
    setSearchUser({ [e.target.name]: e.target.value });
  };

  return (
    <div className="home">
      <div className="home-container">
        <div className="home-container__left">
          <div className="chat-main-head-container">
            <div className="chat-head">
              <p>Ecomiti Chat</p>
            </div>
            <div className="home-profile">
              <div className="profile">
                <div className="profile-avatar">
                  <img src={Profile} alt="" width="50" height="50" />
                </div>
                <div className="profile-name">
                  <p>Tonnan</p>
                </div>
              </div>
              <div className="logout-btn">
                <button onClick={() => navigate("/login")}>Logout</button>
              </div>
            </div>
          </div>
          <div className="chat-input-container">
            <input
              onChange={handleChange}
              type="text"
              name="search"
              placeholder="Find a User"
            />
          </div>
          <div className="chats-box">
            <Chat />
          </div>
        </div>
        <div className="home-container__right">
          {/* <p>Choose a chat to start the conversation</p> */}
          <Message />
        </div>
      </div>
    </div>
  );
};

export default Home;
