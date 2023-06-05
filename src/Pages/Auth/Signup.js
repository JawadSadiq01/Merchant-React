import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GLOBALS from '../../config';
import { Alert } from '@mui/material';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isTouched: false
  });
  const [terms, setTerms] = useState(true)

  const errorStyle = {
    color: 'red',
    fontSize: "12px",
    textAlign: 'left',
    marginBottom: '12px'
  }

  const PasswordErrorMessage = () => {
    return (
      <p style={errorStyle}>Password does not match.</p>
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let url = GLOBALS.BASE_URL + 'admins';
    console.log(url);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };
    const postData = {
      "admin": {
        name: name,
        email: email,
        password: password,
      }
    };
    console.log(postData);
    axios
      .post(url, postData, config)
      .then((response) => {
        console.log(response);
        if (response.data.error == true) { setSuccessMsg(""); setErrorMsg(response.data.msg + '!'); }
        else {
          setSuccessMsg("User Created Successfully!");
          console.log(response);
          setErrorMsg("");
          setTimeout(function () {
            navigate('/login');
          }, 2000); //Time before execution
        }
      })
      .catch((error) => {
        setSuccessMsg("");
        console.log("axios error: ", error);
        setErrorMsg("Network Error!");
      });

  };

  const style = {
    borderBottom: "1px dashed white"
  }

  return (
    <>
      <div className="main-w3layouts wrapper">
        <h1>SignUp</h1>
        <div className="main-agileinfo">
          <div className="agileits-top">
            {errorMsg != "" && <Alert severity="error">{errorMsg}</Alert>}
            {successMsg != "" && <Alert severity="success">{successMsg}</Alert>}
            <form onSubmit={handleSubmit}>
              <input
                className="text"
                style={style}
                type="text"
                name="Username"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
              <input
                className="text"
                style={style}
                type="password"
                name="password"
                placeholder="Confirm Password"
                value={confirmPassword.value}
                onChange={(e) =>
                  setConfirmPassword({
                    ...confirmPassword,
                    value: e.target.value,
                  })
                }
                onBlur={(e) =>
                  setConfirmPassword({ ...confirmPassword, isTouched: true })
                }
                required
              />
              {password !== confirmPassword.value &&
                confirmPassword.isTouched ? (
                <PasswordErrorMessage />
              ) : null}

              {/* <div style={{ marginBottom: '20px' }} className="wthree-text">
                <div class="form-check">
                  <label class="form-check-label" for="exampleRadios1">
                    Signed Up As an Admin
                  </label>
                  <input required class="form-check-input" type="radio" name="userType" id="exampleRadios1" value="admin" />
                </div>
                <div class="form-check">
                  <label class="form-check-label" for="exampleRadios2">
                    Signed Up As a Merchant
                  </label>
                  <input required class="form-check-input" type="radio" name="userType" id="exampleRadios2" value="merchant" />
                </div>
                <div className="clear"> </div>
              </div> */}

              <div className="wthree-text">
                <label className="anim">
                  <input
                    type="checkbox"
                    className="checkbox"
                    required=""
                    onChange={() => setTerms(!terms)}
                  />
                  <span> I Agree To The Terms & Conditions</span>
                </label>
                <div className="clear"> </div>
              </div>
              <input
                className="submitBtn"
                type="submit"
                value="SIGNUP"
                disabled={
                  terms ||
                    (password !== confirmPassword.value)
                    ? true
                    : false
                }
              />
            </form>
            <p>
              Already have an Account? <a href="/login"> Login Now!</a>
            </p>
          </div>
        </div>
        <ul className="colorlib-bubbles">
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
export default Signup