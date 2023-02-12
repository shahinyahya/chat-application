import "./home.css";
import Chat from "../chat/Chat";
import Message from "../message/Message";
import { useState, useContext, useEffect } from "react";
import { ChatContext } from "../../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase-backend/config";

const Home = () => {
  const { data } = useContext(ChatContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);
  console.log(messages);
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
          {messages.map((m) => {
            return <Message message={m} key={m.id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
