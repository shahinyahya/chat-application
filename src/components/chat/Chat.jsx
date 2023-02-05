import "./chat.css";
import Tonnan from "../../assets/secondary-post-2.jpeg";

const Chat = () => {
  return (
    <div className="chat-area-container">
      <div className="users-container">
        <div className="user-box">
          <div className="user-profile__left">
            <img src={Tonnan} alt="" width="60" height="60" />
          </div>
          <div className="user__right">
            <div className="chat-username">
              <strong>Tonnan</strong>
            </div>
            <div className="chat-message__latest">
              <p>I'll be there</p>
            </div>
          </div>
        </div>
        <div className="user-box">
          <div className="user-profile__left">
            <img src={Tonnan} alt="" width="60" height="60" />
          </div>
          <div className="user__right">
            <div className="chat-username">
              <strong>Tonnan</strong>
            </div>
            <div className="chat-message__latest">
              <p>I'll be there</p>
            </div>
          </div>
        </div>
        <div className="user-box">
          <div className="user-profile__left">
            <img src={Tonnan} alt="" width="60" height="60" />
          </div>
          <div className="user__right">
            <div className="chat-username">
              <strong>Tonnan</strong>
            </div>
            <div className="chat-message__latest">
              <p>I'll be there</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
