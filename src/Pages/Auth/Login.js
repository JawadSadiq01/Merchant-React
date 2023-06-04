import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import GLOBALS from '../../../config';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // let url = GLOBALS.BASE_URL + 'login';
    let url = 'https://8ef2-39-62-29-247.ngrok-free.app/admin/login';
    console.log(url);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    const postData = {
      email: "admin1@gmail.com",
      password: "123123"
    };
    axios
      .post(url, postData, config)
      .then((response) => {
        // localStorage.setItem("user_id", response.data.user._id);
        // localStorage.setItem("user_email", response.data.user.email);
        // localStorage.setItem("user_name", response.data.user.name);
        console.log(response);
        navigate("/admin-dashboard");
      })
      .catch((error) => {
        console.log(error);
        // setErrorMsg(error.response.data.message);
      });
  };

  const style = {
    borderBottom: "1px dashed white",
  };

  return (
    <>
      <div class="main-w3layouts wrapper">
        <h1>Login</h1>
        <div class="main-agileinfo">
          <div class="agileits-top">
            <form onSubmit={handleSubmit}>
              <div style={{ color: "red" }}>{errorMsg}</div>
              <input
                className="text"
                style={style}
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="text"
                style={style}
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                min={6}
                required
              />
              <input type="submit" value="Login" />
            </form>
            <p>
              Don't have an Account? <a href="/sign-up"> Sign-Up Now!</a>
            </p>
          </div>
        </div>
        <ul class="colorlib-bubbles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default Login;