import "./message.css";
import { IoMdVideocam } from "react-icons/io";
import { HiUserAdd } from "react-icons/hi";
import { SlOptions } from "react-icons/sl";
import { BsPaperclip } from "react-icons/bs";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useState } from "react";
// import { AuthContext } from "../../context/AuthContext";
import Photo from "../../assets/recent-post-1.jpeg";
// import { ChatContext } from "../../context/ChatContext";
// import {
//   arrayUnion,
//   doc,
//   serverTimestamp,
//   Timestamp,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../../firebase-backend/config";
// import { v4 as uuid } from "uuid";

const Message = () => {
  // const { data } = useContext(ChatContext);
  // const { currentUser } = useContext(AuthContext);

  const [text, setText] = useState("");
  // const [image, setImage] = useState(null);

  const handleChange = (e) => {
    let inputChange = { [e.target.name]: e.target.value };
    // setText({ [e.target.name]: e.target.value });
    setText({ ...text, ...inputChange });
  };

  // const handleSend = async () => {};
  //   await updateDoc(doc(db, "chats", data.chatId), {
  //     messages: arrayUnion({
  //       id: uuid(),
  //       text,
  //       senderId: currentUser.uid,
  //       date: Timestamp.now(),
  //     }),
  //   });
  // };

  // await updateDoc(doc(db, "userChats", data.user.uid), {
  //   [data.chatId + ".lastMessage"]: {
  //     text,
  //   },
  //   [data.chatId + ".date"]: serverTimestamp(),
  // });

  // setText("");

  return (
    <div className="message">
      <div className="message-area-container">
        <div className="message-chat-head">
          <div className="message-username">
            <p>Tonnan</p>
          </div>
          <div className="message-icons">
            <div className="icon">
              <IoMdVideocam />
            </div>
            <div className="icon">
              <HiUserAdd />
            </div>
            <div className="icon">
              <SlOptions />
            </div>
          </div>
        </div>

        <div className="message-chat-area">
          <div className="client-message">
            <div className="msg-area">
              <div className="profile-message">
                <img src={Photo} alt="" width="55" height="55" />
                <small>Just Now</small>
              </div>

              <div className="message-content">
                <p>Hello There kunjapu</p>
              </div>
            </div>
            <div className="msg-area">
              <div className="profile-message">
                <img src={Photo} alt="" width="55" height="55" />
                <small>Just Now</small>
              </div>

              <div className="message-content">
                <p>Hello There kunjapu</p>
              </div>
            </div>
            <div className="msg-area">
              <div className="profile-message">
                <img src={Photo} alt="" width="55" height="55" />
                <small>Just Now</small>
              </div>

              <div className="message-content">
                <p>Hello There kunjapu</p>
              </div>
            </div>
          </div>
          <div className="server-message">
            <div className="msg-area-right">
              <div className="profile-message">
                <img src={Photo} alt="" width="55" height="55" />
                <small>Just Now</small>
              </div>

              <div className="message-content-right">
                <p>Hello There kunjapu</p>
              </div>
            </div>
            <div className="msg-area-right">
              <div className="profile-message">
                <img src={Photo} alt="" width="55" height="55" />
                <small>Just Now</small>
              </div>

              <div className="message-content-right">
                <p>Hello There kunjapu</p>
              </div>
            </div>
            <div className="msg-area-right">
              <div className="profile-message">
                <img src={Photo} alt="" width="55" height="55" />
                <small>Just Now</small>
              </div>

              <div className="message-content-right">
                {/* <p>Hello There kunjapu</p> */}
                <img src={Photo} alt="" height="300" width="200" />
              </div>
            </div>
          </div>
        </div>

        <div className="message-input-area">
          <div className="message-input-container">
            <input
              type="text"
              name="messages"
              placeholder="Type Something..."
              onChange={handleChange}
            />
          </div>
          <div className="message-right">
            <div className="icon">
              <BsPaperclip />
            </div>
            <div className="icon">
              <MdOutlineAddPhotoAlternate />
            </div>
            <div className="send-btn">
              <button>Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
