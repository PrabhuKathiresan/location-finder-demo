import axios from 'axios';
axios.defaults.withCredentials = true;

const setConfig = params => ({
  params
});

export const get = (url, params = {}) => axios.get(url, setConfig(params));

export const post = (url, data, params = {}) => axios.post(url, data, setConfig(params));

export const put = (url, data, params = {}) => axios.put(url, data, setConfig(params));

export const remove = (url, params = {}) => axios.delete(url, setConfig(params));