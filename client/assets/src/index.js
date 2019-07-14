import React from 'react';
import {
  Switch, BrowserRouter as Router, Route
} from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './components/App';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import Home from './components/Home';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

render(
  <Provider store={store}>
    <Router>
      <Switch>
        <App>
          <Route exact path='/' component={ProtectedRoute(Home)} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/home' component={ProtectedRoute(Home)} />
        </App>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);