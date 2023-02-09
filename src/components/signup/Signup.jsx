import "../signin/signin.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ErrorContext } from "../../context/ErrorContext";
import { storage, db, auth } from "../../firebase-backend/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const { err, setErr } = useContext(ErrorContext);
  const [data, setData] = useState({});
  const [avatar, setAvatar] = useState({});
  const [task, setTask] = useState(0);
  const navigate = useNavigate();

  function handleClick(e) {
    let inputChange = { [e.target.name]: e.target.value };
    setData({ ...data, ...inputChange });
  }

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // .then(async (res) => {
      // console.log(res);
      // await updateProfile(res.user, {
      //   displayName: data.username,
      // });
      const refStore = ref(storage, `profile/${avatar.name}`);
      const uploadTask = uploadBytesResumable(refStore, avatar);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          // console.log("Upload is " + progress + "% done");
          setTask(progress);
        },
        (err) => setErr(true),
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then(async (downloadurl) => {
              await updateProfile(res.user, {
                displayName: data.username,
                photoURL: downloadurl,
              });
              await setDoc(doc(db, "users", res.user.uid), {
                uid: res.user.uid,
                displayName: data.username,
                email: res.user.email,
                photoURL: downloadurl,
              });
              await setDoc(doc(db, "userChats", res.user.uid), {});
            })
            .then(() => navigate("/login"));
        }
      );
      // .then(() => navigate("/login"));
      // )
      // }
    } catch (err) {
      setErr(true);
      // console.log(err.message);
    }
  };

  return (
    <div className="signin-container">
      <div className="login-box">
        <div className="chat-title">
          <h1>Ecomiti Chat App</h1>
        </div>

        <div className="login-title">
          <p>Register</p>
        </div>

        {/* =========================================================================== */}

        <form className="login-form" onSubmit={handleRegistration}>
          <div className="input-container">
            <input
              placeholder="Username.."
              type="text"
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
            {/* <img src={avatar ? avatar : ""} alt="" width="80" height="80" /> */}
            <input
              className="avatar-file"
              type="file"
              onChange={(e) => {
                setAvatar(e.target.files[0]);
              }}
            />
            {`${task}%`}
          </div>

          <div className="login-btn__fill">
            <button>Sign Up</button>
          </div>
        </form>
        {err && <span>An error Ocuured</span>}
        <div className="registration-container">
          <p>
            You do have an account?
            <Link to="/login" className="link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
