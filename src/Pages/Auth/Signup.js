import React from 'react';
import axios from 'axios';

function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    var data = Object.fromEntries(formData.entries());
    console.log(data);

    axios.post('https://api.example.com/data', {
      data: data
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

  };

  return (
    <>
      <div class="main-w3layouts wrapper">
        <h1>SignUp</h1>
        <div class="main-agileinfo">
          <div class="agileits-top">
            <form onSubmit={handleSubmit}>
              <input class="text" type="text" name="Username" placeholder="Username" required="" />
              <input class="text " type="text" name="email" placeholder="Email" required="" />
              <input class="text" type="password" name="password" placeholder="Password" required="" />
              <input class="text w3lpass" type="password" name="password" placeholder="Confirm Password" required="" />
              <div class="wthree-text">
                <label class="anim">
                  <input type="checkbox" class="checkbox" required="" />
                  <span>I Agree To The Terms & Conditions</span>
                </label>
                <div class="clear"> </div>
              </div>
              <input type="submit" value="SIGNUP" />
            </form>
            <p>Already have an Account? <a href="/login"> Login Now!</a></p>
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

export default Signup