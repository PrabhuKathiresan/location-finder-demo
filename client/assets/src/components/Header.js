import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signout } from '../services';
import { setUserLoggedIn } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  signOut = () => {
    signout()
      .then(() => {
        this.props.dispatch(setUserLoggedIn(false, null));
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUser = () => {
    const { user: { methods } } = this.props;
    const method = methods[0];
    return this.props.user[method].email;
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '30px' }}>
        <Link className="navbar-brand" to="/">Location App</Link>

        <div className="collapse navbar-collapse">
          {/* { this.props.isAuth && <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
          </ul> } */}

          <ul className="nav navbar-nav ml-auto">
            { !this.props.isAuth &&
              [<li className="nav-item" key="signup">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>,
              <li className="nav-item" key="signin">
                <Link className="nav-link" to="/signin">Sign In</Link>
              </li>] }
            
            { this.props.isAuth &&
              <Fragment>
                <li className='nav-item'>
                  <span className='navbar-text'>{this.getUser()}</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin" onClick={this.signOut}>Sign Out</Link>
                </li>
              </Fragment> }
          </ul>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.app.isAuthenticated,
  user: state.app.user
});

export default connect(mapStateToProps)(Header);
