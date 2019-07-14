import React, { Component } from 'react';
import { connect } from 'react-redux';
import { checkStatus } from '../services';
import { setUserLoggedIn, setAPIError } from '../actions';
import Header from './Header';
import Error from './Error';

class App extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    authenticating: true,
    error: false
  }
  componentDidMount() {
    const { dispatch } = this.props;
    checkStatus()
      .then(({ data }) => {
        dispatch(setUserLoggedIn(true, data.user));
      })
      .catch(({ response }) => {
        dispatch(setUserLoggedIn(false, null));
        let error = false;
        if (!response) {
          error = true;
          dispatch(setAPIError());
        }
        this.setState({
          authenticating: false,
          error
        });
      })
      .finally(() => {
        this.setState({
          authenticating: false
        });
      });
  }
  render() {
    if (this.state.authenticating) return <div>Loading...</div>;
    return (
      <div>
        <Header />
        <div className="container">
          { this.state.error && <Error /> }
          { !this.state.error && this.props.children }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  app: state.app
});

export default connect(mapStateToProps)(App);
