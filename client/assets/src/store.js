import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import rootReducer from './reducers';

function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(ReduxThunk));
}

export default configureStore();