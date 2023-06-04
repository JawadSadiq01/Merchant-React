import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
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

    axios.post('http://127.0.0.1:5000/api/signup', {
      name: name,
      email: email,
      password: password,
    })
      .then(response => {
        navigate('/login');
      })
      .catch(error => {
        setErrorMsg(error.response.data.message);
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
            <form onSubmit={handleSubmit}>
              <div style={{ color: 'red' }} >{errorMsg}</div>
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
              <div className="wthree-text">
                <label className="anim">
                  <input
                    type="checkbox"
                    className="checkbox"
                    required=""
                    onChange={() => setTerms(!terms)}
                  />
                  <span>I Agree To The Terms & Conditions</span>
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

// import React from 'react';
// import axios from 'axios';

// function Signup() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     var data = Object.fromEntries(formData.entries());
//     console.log(data);

//     axios.post('https://api.example.com/data', {
//       data: data
//     })
//       .then(response => {
//         console.log(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });

//   };

//   return (
//     <>
//       <div class="main-w3layouts wrapper">
//         <h1>SignUp</h1>
//         <div class="main-agileinfo">
//           <div class="agileits-top">
//             <form onSubmit={handleSubmit}>
//               <input class="text" type="text" name="Username" placeholder="Username" required="" />
//               <input class="text " type="text" name="email" placeholder="Email" required="" />
//               <input class="text" type="password" name="password" placeholder="Password" required="" />
//               <input class="text w3lpass" type="password" name="password" placeholder="Confirm Password" required="" />
//               <div class="wthree-text">
//                 <label class="anim">
//                   <input type="checkbox" class="checkbox" required="" />
//                   <span>I Agree To The Terms & Conditions</span>
//                 </label>
//                 <div class="clear"> </div>
//               </div>
//               <input type="submit" value="SIGNUP" />
//             </form>
//             <p>Already have an Account? <a href="/login"> Login Now!</a></p>
//           </div>
//         </div>
//         <ul class="colorlib-bubbles">
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//         </ul>
//       </div>
//     </>
//   )
// }

// export default Signup