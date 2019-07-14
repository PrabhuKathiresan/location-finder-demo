import appconstants from '../constants/app';

const initialState = {
  data: [],
  searchParams: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case appconstants.locations.add:
      return {
        ...state, data: [...state.data, ...action.locations]
      };
    case appconstants.locations.reset:
      return {
        ...state, data: [...action.locations]
      }
    default:
      return state;
  }
}