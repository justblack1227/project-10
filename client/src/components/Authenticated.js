import React from 'react';
import { Link } from 'react-router-dom';

// This component is rendered when user signs up to website. 
export default ({context}, props) => {
  const authUser = context.authenticatedUser;
  const reroute = setTimeout(function(){window.location.replace('/');}, 5000);
  return (
  <div className="bounds">
    <div className="grid-100" onLoad= {reroute}>
      <h1>Congratulations {authUser.firstName}! Signup was successful!</h1>
      <p>You should be redirected in 5 seconds. If not, <Link to='/'> click here</Link>.</p>
    </div>
  </div>
  );
}