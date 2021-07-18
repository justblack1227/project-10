import React, { Component } from 'react';
import Data from './Data.js';
import Cookies from 'js-cookie';

const Context = React.createContext(); 

export class Provider extends Component {
  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const {authenticatedUser, password } = this.state;
    const value = {
      authenticatedUser, 
      password,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      }
    };
    
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  /**
  * Checks and returns authenicated User, storing state in a cookie.
  * @param {string } emailAddress - Provided input from user
  * @param {string } password - Provided input from user
  * @returns {String} Authenticated User
  */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      user.password = password
      this.setState(() => {
        return {
          authenticatedUser:user,
        };
      })
      Cookies.set('authenticatedUser', JSON.stringify(user), {expires: 1});
    }
    return user;
  }

  /**
  * Removes authenticatedUser's state
  */
  signOut = () => {
    this.setState({authenticatedUser:null});
    Cookies.remove('authenticatedUser')
  }
}


export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

