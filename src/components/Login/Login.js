import React, { useState } from "react";
import styles from "./../SignUp/SignUp.module.css";
import InputForm from "../InputForm/InputForm";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ handleLogin }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");
  const handleSubmission = () => {
    if (!values.email || !values.password) {
      setErrorMsg("Fill all the fields");
      return false;
    }
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((res) => {
        handleLogin();
        navigate("/");
      })
      .catch((error) => {
        setErrorMsg(error.message);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Login</h1>
        <InputForm
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          type="email"
          label="Email : "
          placeholder="Enter Your Email "
        />
        <InputForm
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
          type="password"
          label="Password : "
          placeholder="Enter Your Password  "
        />
        <div className={styles.footer}>
          <b className={styles.error}>{errorMsg}</b>
          <button onClick={handleSubmission}>Login</button>
          <span>
            <p>
              Click to Sign Up {"->"} {"  "}
              <span>
                <Link to="/signup">SignUp</Link>
              </span>
            </p>
          </span>
        </div>
      </div>
    </div>
  );
}
