import axios from 'axios';
import Cookies from 'js-cookie';
// import { logoutRemoveData } from 'utils/cacheManagement';
import { BASE_PATH } from './apiRoutes.constants';
import { toast } from 'react-toastify';
// import { getAuthToken } from 'utils/cacheManagement';

axios.interceptors.request.use((value) => {
  value.headers = {
    idtoken: localStorage.getItem('token') || '',
  };
  return value;
});

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 && !error.response.data.code) {
      Cookies.remove('idToken');
      localStorage.clear();
      window.location.reload();
      toast.error('Session Expired. Please Login Again');
      return;
    } else if (error.response.status === 401 && error.response.data.code) {
      toast.error('Third Party API Gateway Error Please Try');
      return;
    } else {
      error.response.data.errors.map((error: any) => {
        toast.error(error.message);
      });
    }
    return null;
  },
);

export const apiReq = async (
  path: any,
  method = 'GET',
  body: any = {},
  baseurl = BASE_PATH,
) => {
  try {
    if (!path) {
      throw new Error('Missing parameters');
    }
    let url = baseurl + path;

    // if (path === '/api/categories' || path === '/api/category') {
    //   url = BASE_PATH_2 + path;
    // }

    // if (
    //   path === '/api/notifications/templates/get-template' ||
    //   path === '/api/notifications/templates/set-template' ||
    //   path === '/api/notifications/templates/delete-template'
    // ) {
    //   url = BASE_PATH_3 + path;
    // }

    // if (path === '/api/users/signin' || path === '/api/users/currentuser') {
    //   axios.defaults.withCredentials = true;
    // }
    if (method === 'GET') {
      return await axios
        .get(url, {
          params: body,
        })
        .then((ret) => ret)
        .catch((err) => err);
    } else if (method === 'POST') {
      return await axios
        .post(url, body)
        .then((ret) => ret)
        .catch((err) => err);
    } else if (method === 'PATCH') {
      return await axios
        .patch(url, body)
        .then((ret) => ret)
        .catch((err) => err);
    } else if (method === 'PUT') {
      return await axios
        .put(url, body)
        .then((ret) => ret)
        .catch((err) => err);
    } else if (method === 'DELETE') {
      // debugger;
      return await axios
        .delete(url, {
          data: {
            ...body,
          },
        })
        .then((ret) => ret)
        .catch((err) => err);
    } else {
      throw new Error('Invalid method: ' + method);
    }
  } catch (err) {
    let errorMessage = 'Failed to do something exceptional';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    throw new Error(errorMessage);
  }
};
