import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    const { context } = props;
    const authUser = context.authenticatedUser;
    return (
        <React.Fragment>
            <div className="header">
                <div className="bounds">
                    <h1 className="header--logo"><Link id="header-link" to="/">Courses</Link></h1>
                    <nav>
                        {authUser ?
                            <React.Fragment>
                                <span> Welcome, {authUser.firstName} {authUser.lastName}!</span>
                                <Link className="signout" to="/signout">Sign Out</Link>
                            </React.Fragment>
                        :
                            <React.Fragment>
                                <Link className="signup" to="/signup">Sign Up</Link>
                                <Link className="signin" to="/signin">Sign In</Link>
                            </React.Fragment>
                        }
                        
                    </nav>
                
                </div>
            </div>
            <hr />
        </React.Fragment>
    );
}   

export default Header;


