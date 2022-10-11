import { toast } from 'react-toastify';
import { apiReq } from './apiRequests';

export const getRequest = async (URL: any, single: boolean = false) => {
  try {
    const res = await apiReq(URL, 'GET', {});
    if (res?.status >= 200 && res?.status < 300) {
      //   toast.success(res?.data?.results?.message);
      if (single) return res?.data?.results?.data;
      return res?.data?.results?.dataItems;
    } else {
      toast.error(res?.response?.data?.errors[0]?.message);
    }
    return null;
  } catch (error: any) {
    // error?.data?.errors?.map((error: any) => {
    //   toast.error(error.message);
    // });
    return null;
  }
};

export const deleteRequest = async (URL: any, id: any) => {
  try {
    const res = await apiReq(URL, 'DELETE', id);
    if (res?.status >= 200 && res?.status < 300) {
      toast.success(res?.data?.results?.message);
      if (res?.data?.results?.data) return res?.data?.results?.data;
      else return res?.data?.results;
    } else {
      toast.error(res?.response?.data?.errors[0]?.message);
    }
    return null;
  } catch (error: any) {
    // error?.data?.errors?.map((error: any) => {
    //   toast.error(error.message);
    // });
    return null;
  }
};

export const postRequest = async (
  URL: any,
  data: any,
  bulk: boolean = false,
  userApi: boolean = false,
) => {
  try {
    const res = await apiReq(URL, 'POST', data);
    if (res?.status >= 200 && res?.status < 300) {
      toast.success(res?.data?.results?.message);
      if (bulk) return res?.data?.results?.dataItems;
      if (userApi) return res?.data?.results?.message;
      return res?.data?.results?.data;
    } else {
      toast.error(res?.response?.data?.errors[0]?.message);
    }
  } catch (error: any) {
    // error?.data?.errors?.map((error: any) => {
    //   toast.error(error.message);
    // });
    return null;
  }
};

export const putRequest = async (URL: any, data: any) => {
  try {
    const res = await apiReq(URL, 'PUT', data);
    if (res?.status >= 200 && res?.status < 300) {
      toast.success(res?.data?.results?.message);
      return res?.data?.results?.data;
    } else {
      toast.error(res?.response?.data?.errors[0]?.message);
    }
    return null;
  } catch (error: any) {
    // error?.data?.errors?.map((error: any) => {
    //   toast.error(error.message);
    // });
    return null;
  }
};
