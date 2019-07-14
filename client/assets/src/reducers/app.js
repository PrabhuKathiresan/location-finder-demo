import appconstants from '../constants/app';

const initialState = {
  isAuthenticated: false,
  user: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case appconstants.app.signin:
      return { ...state, isAuthenticated: action.isAuthenticated, user: action.user };
    default:
      return state;
  }
}