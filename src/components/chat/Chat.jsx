import "./chat.css";
import "../home/home.css";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-backend/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase-backend/config";
import { ErrorContext } from "../../context/ErrorContext";

const Chat = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { err, setErr } = useContext(ErrorContext);

  // console.log(currentUser);

  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    setSearchUser(e.target.value);
  };

  const handleSearch = async () => {
    const col = collection(db, "users");

    const que = query(col, where("displayName", "==", searchUser));

    try {
      const querysnap = await getDocs(que);
      querysnap.forEach((doc) => {
        setUser(doc.data());
        // console.log(doc.data());
      });
    } catch (err) {
      setErr(true);
      // console.log(err.message);
    }
  };

  const handleKey = (e) => e.code === "Enter" && handleSearch();

  return (
    <>
      <div className="chat-main-head-container">
        <div className="chat-head">
          <p>Ecomiti Chat</p>
        </div>
        <div className="home-profile">
          <div className="profile">
            <div className="profile-avatar">
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName}
                width="50"
                height="50"
              />
            </div>
            <div className="profile-name">
              <p>Hello {currentUser && currentUser.displayName}</p>
            </div>
          </div>
          <div className="logout-btn">
            <button
              onClick={() => signOut(auth).then(() => navigate("/login"))}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div className="chat-input-container">
        <input
          onChange={handleChange}
          onKeyDown={handleKey}
          type="text"
          name="search"
          placeholder="Find a User"
        />
      </div>
      <div className="chat-area-container">
        <div className="users-container">
          {err && <span style={{ color: "white" }}>No Users Found..</span>}
          {user && (
            <div className="user-box">
              <div className="user-profile__left">
                <img src={user.photoURL} alt="" width="60" height="60" />
              </div>
              <div className="user__right">
                <div className="chat-username">
                  <strong>{user.displayName}</strong>
                </div>
                <div className="chat-message__latest">
                  <p>I'll be there</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
