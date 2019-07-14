import { combineReducers } from 'redux';
import appReducer from './app';
import locationsReducer from './locations';
import errorReducer from './error';

export default combineReducers({
  app: appReducer,
  locations: locationsReducer,
  error: errorReducer
});