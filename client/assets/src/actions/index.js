import appconstants from '../constants/app';

export const setUserLoggedIn = (isAuthenticated, user) => ({
  type: appconstants.app.signin,
  isAuthenticated,
  user
});

export const addLocations = locations => ({
  type: appconstants.locations.add,
  locations
});

export const resetLocations = locations => ({
  type: appconstants.locations.reset,
  locations
});

export const setAPIError = () => ({
  type: appconstants.error.apiServerError
});