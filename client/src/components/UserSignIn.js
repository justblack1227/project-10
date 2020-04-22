import React, { Component } from 'react';
import ErrorsDisplay from './ErrorsDisplay.js';
import { Link } from 'react-router-dom';

export default class UserSignIn extends Component {
    state = {
        emailAddress: '',
        password: '',
        errors: [],
      }
    /**
     * Handles the click functionality for when user hits cancel.
     * @param {event} Click - when user clicks button to cancel. 
     */
    handleClick = e => {
        e.preventDefault();
        this.props.history.push('/');
    }
  
    /**
     * Handles the submit functionality for when user signs in.
     * @param {event} Submit - Sign in form is submitted. 
     */
    handleSubmit = (e) => {
        e.preventDefault();
        this.submit();
    }
    
    render() {
        const {
          emailAddress,
          password,
          errors,
        } = this.state;

        return (
        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign In</h1>
            <div>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={this.handleSubmit}>
                <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={this.change} placeholder="Email Address" defaultValue={emailAddress} /></div>
                <div><input id="password" name="password" type="password" className="" onChange={this.change} placeholder="Password" defaultValue={password} /></div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><button className="button button-secondary" onClick={this.handleClick}>Cancel</button></div>
                </form>
            </div>
            <p>&nbsp;</p>
            <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
            </div>
        </div>
        );
    }

    /**
     * Sets and changes state when user updates input fields.
     * @param {event} change - input fields. 
     */
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
            [name]: value
            };
        });
    }
    
    /**
    * Sends sign in request and checks for errors
    */
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/'}};
        const { emailAddress, password } = this.state;

        context.actions.signIn(emailAddress, password)
         .then( user => {
             if (user === null) {
                 this.setState(() => {
                    return { errors: [ 'Sign-in was unsuccessful']}
                 });
             } else {
                 this.props.history.push(from);
             }
         })
         .catch( err => {
             this.props.history.push('/error');
         })
    }
    
}

