import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';

const doLogin = async (data: any, dispatch: any) => {
  dispatch({ type: 'LOGIN_START' });
  try {
    let res = await apiReq(API_ROUTES.login, 'POST', data);
    if (res?.status === 200) {
      localStorage.setItem('token', res?.headers?.idtoken);
      localStorage.setItem('user', JSON.stringify(res?.data?.results?.data));
      localStorage.setItem('LoggedIn', 'true');
      dispatch({ type: 'LOGIN_SUCCESS', payload: res?.data?.results?.data });
      toast.success('Login Successful');
      return res?.data?.results;
    } else {
      toast.error(res?.response?.data?.errors[0]?.message);
    }
  } catch (err) {
    dispatch({ type: 'LOGIN_FAILURE', payload: err });
  }
};

const getCurrentUser = async () => {
  try {
    let res = await apiReq(API_ROUTES.currentUser, 'GET');

    if (res?.status === 200) {
      return res?.data?.result?.data;
    }
  } catch (err) {
    console.log(err);
  }
};

const doSignup = async (data: any) => {
  return await apiReq(API_ROUTES.register, 'POST', data)
    .then((res: any) => {
      if (res?.status === 201) {
        return res?.data;
      } else {
        // toast.error(res.message);
      }
      return null;
    })
    .catch(() => {
      //   toast.error('Something went wrong!');
    });
};

const forgotPassword = async (data: any) => {
  return await apiReq(API_ROUTES.forgotPassword, 'POST', data)
    .then((res: any) => {
      if (res?.status === 200) {
        toast.success('Please Check Your Email');
        return res?.data?.results;
      } else {
        toast.error(res.message);
      }
      return null;
    })
    .catch(() => {
      toast.error('Something went wrong!');
    });
};

const resetPassword = async (data: any) => {
  return await apiReq(API_ROUTES.confirmPassword, 'POST', data)
    .then((res: any) => {
      if (res?.status === 200) {
        return res?.data?.results;
      }
      toast.info(res.message);
      return null;
    })
    .catch(() => {
      toast.error('Something went wrong!');
    });
};

const logout = async (dispatch: any) => {
  return await apiReq(API_ROUTES.signOut, 'GET')
    .then((res) => {
      if (res?.status === 200) {
        dispatch({ type: 'LOG_OUT' });
        localStorage.clear();
        toast.success('Logged Out');
      }
      return res?.data?.results;
    })
    .catch(() => {
      // toast.error('Something went wrong!');
    });
};

export default {
  doLogin,
  doSignup,
  forgotPassword,
  resetPassword,
  getCurrentUser,
  logout,
};
