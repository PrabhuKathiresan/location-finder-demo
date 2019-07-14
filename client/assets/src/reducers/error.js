import appconstants from '../constants/app';

export default (state = {}, action) => {
  switch (action.type) {
    case appconstants.error.apiServerError:
      return { ...state, message: 'Something went wrong... Please check if Backend service is running' };
    case appconstants.error.internalError:
      return { ...state, message: 'Something went wrong with the API server...' };
    default:
      return state;
  }
};