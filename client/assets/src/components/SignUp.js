import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'pkui-designs';
import OAuth from './OAuth';
import { isEmailValid } from '../utils';
import { signup } from '../services';
import { setUserLoggedIn } from '../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    email: '',
    password: '',
    cpassword: '',
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
      email, password, cpassword
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
    if (!cpassword) {
      return this.setState({
        error: 'Confirm your password'
      });
    }
    if (password !== cpassword) {
      return this.setState({
        error: 'Passwords does not match'
      });
    }
    this.setState({
      loading: true,
      error: null
    });
    signup({
      email,
      password
    })
      .then(({ data }) => {
        this.props.dispatch(setUserLoggedIn(true, data.user));
      })
      .catch(err => {
        console.error('err', err);
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
              <h4>Sign up form</h4>
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
                <Input
                  placeholder={'re-enter password'}
                  label={'Confirm password'}
                  onChange={this.handleInputChange}
                  showClear={false}
                  name={'cpassword'}
                  value={this.state.cpassword}
                  type={'password'}
                />
                <button className='btn btn-block btn-primary'>Sign Up</button>
              </form>
            </div>
            <div className='col-lg-4 col-md-6'>
              <OAuth />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.app.isAuthenticated
});

export default connect(mapStateToProps)(SignUp)
