import React, { Component } from 'react';
import Data from '../Data';
import ErrorsDisplay from './ErrorsDisplay.js';
import { Link } from 'react-router-dom';

export default class UserSignUp extends Component {
    constructor() {
        super();
        this.data = new Data();
      }

    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
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
    * Handles the submit functionality for when user sends sign up requst.
    * @param {event} Submit -  sign up form
    */
    handleSubmit = (e) => {
        e.preventDefault();
        this.submit();
      }

    render () {
        const {
            firstName, 
            lastName,
            emailAddress,
            password,
            confirmPassword,
            errors,
          } = this.state;

        return (
        <div className="bounds">
            <div className="grid-33 centered signin">
            <h1>Sign Up</h1>
            <div>
                <ErrorsDisplay errors={errors} />
                <form onSubmit={this.handleSubmit}>
                <div><input id="firstName" name="firstName" type="text" className="" onChange={this.change} placeholder="First Name" defaultValue={firstName} /></div>
                <div><input id="lastName" name="lastName" type="text" className="" onChange={this.change} placeholder="Last Name" defaultValue={lastName} /></div>
                <div><input id="emailAddress" name="emailAddress" type="text" className="" onChange={this.change} placeholder="Email Address" defaultValue={emailAddress} /></div>
                <div><input id="password" name="password" type="password" className="" onChange={this.change} placeholder="Password" defaultValue={password} /></div>
                <div><input id="confirmPassword" name="confirmPassword" type="password" className="" onChange={this.change} placeholder="Confirm Password" defaultValue={confirmPassword} /></div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick={this.handleClick}>Cancel</button></div>
                </form>
            </div>
            <p>&nbsp;</p>
            <p>Already have a user account? <Link to="/signin">Click here</Link> to sign in!</p>
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
    * Sends sign up request and checks for errors
    */
    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/authenticated'}};
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            confirmPassword,
        } = this.state;

        const user = {
            firstName,
            lastName,
            password,
            emailAddress,
        }

        if (password===confirmPassword) {
            context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    context.actions.signIn(emailAddress, password)
                    .then(() => {
                        this.props.history.push(from)
                    });
                }
            })
            .catch( err => {
                this.props.history.push ('/error');
            });
        } else {
            this.setState({
                errors: ["Passwords do not match"]
            })
        }
    }
}
