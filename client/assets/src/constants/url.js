const apiurl = 'http://localhost:5000';

export default {
  users: {
    signup: `${apiurl}/users/signup`,
    signin: `${apiurl}/users/signin`,
    signout: `${apiurl}/users/signout`,
    oauth: {
      google: `${apiurl}/users/oauth/google`,
      facebook: `${apiurl}/users/oauth/facebook`
    },
    status: `${apiurl}/users/status`
  },
  locations: {
    get: `${apiurl}/locations`,
    upload: `${apiurl}/locations/upload`,
    search: `${apiurl}/locations/search`
  }
};