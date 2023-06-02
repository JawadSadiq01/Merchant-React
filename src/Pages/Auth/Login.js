import React from 'react';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    var data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <>
      <div class="main-w3layouts wrapper">
        <h1>Login</h1>
        <div class="main-agileinfo">
          <div class="agileits-top">
            <form onSubmit={handleSubmit}>
              <input class="text " type="text" name="email" placeholder="Email" required="" />
              <input class="text" type="password" name="password" placeholder="Password" required="" />
              <input type="submit" value="Login" />
            </form>
            <p>Don't have an Account? <a href="/sign-up"> Sign-Up Now!</a></p>
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
  )
}

export default Login