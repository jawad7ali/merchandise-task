import axios from "axios";
import constants from "../../config/constants";
import { Notifications } from "@/components/notification";
import { getSession } from 'next-auth/react'
import apiEndpoints from "../../config/apiEndpoints";
import { jwtDecode } from 'jwt-decode';

const baseURL = constants.APP_URL;
const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Function to refresh token
const refreshToken = async () => {
  try {
    const { REFRESH_TOKEN } = apiEndpoints;
    const response = await axios.post(`${baseURL}${REFRESH_TOKEN}`, {}, { withCredentials: true });
    return response.data.accessToken;
  } catch (error) {
    return null;
  }
};

const axiosInstance = axios.create({
  baseURL,
  headers: defaultHeaders,
});

axiosInstance.interceptors.request.use(async function (config) {
  // Do something before request is sent
  const session = await getSession()
  const accessToken = session?.user?.accessToken;
  if (accessToken) {
    const decodedToken: {exp: number} = await jwtDecode(accessToken);
    if (decodedToken.exp < Date.now() / 1000) {
      const newToken = await refreshToken();
      config.headers.Authorization = 'Bearer ' + newToken;
    } else {
      config.headers.Authorization = 'Bearer ' + accessToken;
    }
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

const handleResponse = (response: any, notification: boolean = true) => {
  if (response?.data?.message && notification) {
    Notifications({ title: 'Success', description: response?.data?.message, type: 'success' })
  }
  return response.data;
}

const handleError = (error: any) => {
  let errorMessage;
  if (error?.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    errorMessage = error?.response.data?.message
    // console.error(error?.response.status);
    // console.error(error?.response.headers);
  } else if (error?.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    errorMessage = error?.request
  } else {
    // Something happened in setting up the request that triggered an Error
    errorMessage = error?.message
  }
  Notifications({ title: 'Error', description: errorMessage, type: 'error' })
  // return Promise.reject(error.response || error.message);
};

const get = (url: any, params = {}, headers = {}) =>
  axiosInstance
    .get(url, { headers, params })
    .then(
      (response) => handleResponse(response, false)
    )
    .catch(handleError);

const post = (url: any, data = {}, config: any = {}) =>
  axiosInstance
    .post(url, data, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

const put = (url: any, data = {}, config: any = {}) =>
  axiosInstance
    .put(url, data, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

const patch = (url: any, data = {}, config: any = {}) =>
  axiosInstance
    .patch(url, data, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

const del = (url: any, config: any = {}) =>
  axiosInstance
    .delete(url, {
      ...config,
      headers: { ...defaultHeaders, ...config.headers },
    })
    .then(handleResponse)
    .catch(handleError);

export default {
  get,
  post,
  put,
  patch,
  delete: del,
};
