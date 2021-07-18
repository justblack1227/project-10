import React from 'react';
import {Redirect} from  'react-router-dom';

export default ({ context }) => {
  console.log(context);
  context.actions.signOut();
    return (
      <Redirect to="/" />
    );
  }

