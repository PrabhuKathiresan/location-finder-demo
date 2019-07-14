import * as xhr from '../xhr';
import url from '../constants/url';

export const signin = data => xhr.post(url.users.signin, data, {});

export const OAuthGoogle = data => xhr.post(url.users.oauth.google, data, {});

export const OAuthFaceBook = data => xhr.post(url.users.oauth.facebook, data, {});

export const signup = data => xhr.post(url.users.signup, data, {});

export const signout = () => xhr.get(url.users.signout, {});

export const checkStatus = () => xhr.get(url.users.status, {});

export const getLocations = () => xhr.get(url.locations.get, {});

export const searchLocation = location => xhr.post(url.locations.search, { location }, {});