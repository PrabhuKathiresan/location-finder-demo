import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'pkui-designs';
import OAuth from './OAuth';
import { isEmailValid } from '../utils';
import { signin } from '../services';
import { setUserLoggedIn } from '../actions';

class SignIn extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    error: null,
    loading: false
  };

  componentDidUpdate() {
    if (this.props.isAuth) {
      this.props.history.push('/home');
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    const {
      email, password
    } = this.state;
    if (!email) {
      return this.setState({
        error: 'Enter email address'
      });
    }
    if (!isEmailValid(email)) {
      return this.setState({
        error: 'Enter valid email address'
      });
    }
    if (!password) {
      return this.setState({
        error: 'Enter password'
      });
    }
    this.setState({
      loading: true,
      error: null
    });
    signin({
      email,
      password
    })
      .then(({ data }) => {
        this.props.dispatch(setUserLoggedIn(true, data.user));
      })
      .catch(err => {
        console.error('err', err);
        this.setState({
          error: 'Invalid username or password'
        });
      });
  };

  handleInputChange = e => {
    e.preventDefault();
    const el = e.target;
    const { name, value } = el;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <div className='row'>
        <div className='col-lg-10 col-md-12' style={ { margin: '0 auto' } }>
          <div className='row justify-content-md-center'>
            <div className='col-lg-4 col-md-6'>
              <h4>Sign in form</h4>
              {this.state.error && <div className='alert alert-danger'>{this.state.error}</div>}
              <form onSubmit={this.handleFormSubmit}>
                <Input
                  placeholder={'enter email address'}
                  label={'Email address'}
                  onChange={this.handleInputChange}
                  showClear={false}
                  name={'email'}
                  value={this.state.email}
                  type={'email'}
                />
                <Input
                  placeholder={'enter password'}
                  label={'Password'}
                  onChange={this.handleInputChange}
                  showClear={false}
                  name={'password'}
                  value={this.state.password}
                  type={'password'}
                />
                <button className='btn btn-block btn-primary'>Sign In</button>
              </form>
            </div>
            <div className='col-lg-4 col-md-6'>
              <OAuth />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.app.isAuthenticated
});

export default connect(mapStateToProps)(SignIn);
