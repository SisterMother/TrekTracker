import React from 'react';

const Login = (props) => (
  <div>
    <form name="loginForm">
      <h2>Login with your username and password!</h2>
      Name:<input name="nameInput" type="text"/>
      Password: <input name="passInput" type="next"/>
      <input type="submit"/>
    </form>
  </div>
);

export default Login;