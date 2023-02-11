import "./chat.css";
import "../home/home.css";
import Avatar from "../../assets/avatar.png";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase-backend/config";
import {
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  where,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase-backend/config";
import { ErrorContext } from "../../context/ErrorContext";

const Chat = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { err, setErr } = useContext(ErrorContext);

  // console.log(currentUser);

  const [searchUser, setSearchUser] = useState("");
  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);

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

  const handleChatSelection = async () => {
    //check whether user chats exists, if not create new one

    const combinedUserId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chatMessages", combinedUserId));

      if (!res.exists()) {
        //if not exist create new one!!!
        await setDoc(doc(db, "chatMessages", combinedUserId), {
          messages: [],
        });

        // Create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedUserId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedUserId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedUserId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedUserId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      setErr(true);
    }

    setUser(null);
    setSearchUser("");
  };

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  console.log(Object.entries(chats));

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
                src={
                  (currentUser.photoURL = "" ? Avatar : currentUser.photoURL)
                }
                alt=""
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
          value={searchUser}
          type="text"
          name="search"
          placeholder="Find a User"
        />
      </div>
      {err && <span style={{ color: "white" }}>No Users Found..</span>}
      <div className="chat-area-container">
        {user && (
          <div className="users-container" onClick={handleChatSelection}>
            {Object.entries(chats)?.map((chat) => (
              <div className="user-box" key={chat[0]}>
                <div className="user-profile__left">
                  <img
                    src={chat[1].userInfo.photoURL}
                    alt=""
                    width="60"
                    height="60"
                  />
                </div>
                <div className="user__right">
                  <div className="chat-username">
                    <strong>{chat[1].userInfo.displayName}</strong>
                  </div>
                  <div className="chat-message__latest">
                    <p>{chat[1].lastMessage?.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Chat;
