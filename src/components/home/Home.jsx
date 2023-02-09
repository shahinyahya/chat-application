import "./home.css";
import Chat from "../chat/Chat";
import Message from "../message/Message";

const Home = () => {
  return (
    <div className="home">
      <div className="home-container">
        <div className="home-container__left">
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
