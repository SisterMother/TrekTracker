import React from 'react';

const Login = (props) => (
  <div>
    <form name="loginForm">
      <h4>Login with your username and password:</h4>
      Name:<input name="nameInput" type="text"/>
      Password: <input name="passInput" type="next"/>
      <input type="submit"/>
    </form>
  </div>
);

export default Login;