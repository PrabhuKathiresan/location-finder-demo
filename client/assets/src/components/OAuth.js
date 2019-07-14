import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { OAuthGoogle, OAuthFaceBook } from '../services';
import { setUserLoggedIn } from '../actions';
import config from '../config';

class OAuth extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    requireRedirect: false
  };

  responseFacebook = response => {
    OAuthFaceBook({ access_token: response.accessToken })
      .then(({ data }) => {
        this.props.dispatch(setUserLoggedIn(true, data.user));
        this.setState({
          requireRedirect: true
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.props.dispatch(setUserLoggedIn(false, null));
      });
  };

  responseGoogle = response => {
    if (!response.accessToken) return;
    OAuthGoogle({ access_token: response.accessToken })
      .then(({ data }) => {
        this.props.dispatch(setUserLoggedIn(true, data.user));
        this.setState({
          requireRedirect: true
        });
      })
      .catch(({ response }) => {
        console.log(response);
        this.props.dispatch(setUserLoggedIn(false, null));
      });
  };

  render() {
    if (this.state.requireRedirect) return <Redirect to='/' />;
    return (
      <Fragment>
        <div className='alert alert-info'>
          Sign In using third-party services
        </div>
        <FacebookLogin
          appId={config.facebook.appId}
          render={renderProps => (
            <button style={{ marginRight: 15 }} className="btn btn-block btn-outline-primary" onClick={renderProps.onClick}>Facebook</button>
          )}
          fields="name,email,picture"
          callback={this.responseFacebook}
          cssClass="btn btn-outline-primary"
        />
        <GoogleLogin 
          clientId={config.google.clientId}
          render={renderProps => (
            <button className="btn btn-block btn-outline-danger" onClick={renderProps.onClick} disabled={renderProps.disabled}>Google</button>
          )}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          className="btn btn-outline-danger"
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  
});

export default connect(mapStateToProps)(OAuth);
