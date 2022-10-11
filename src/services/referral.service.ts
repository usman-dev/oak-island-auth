import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

//Categories
const addReferral = async (data: any) => {
  return await postRequest(API_ROUTES.addReferral, data);
  // return await apiReq(API_ROUTES.addBanners, 'POST', formData)
  //   .then((res: any) => {
  //     if (res?.status === 200) {
  //       toast.success(res?.data?.results?.message);
  //       return res?.data;
  //     } else {
  //       toast.error(res?.response?.data?.errors[0]?.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

const getReferral = async () => {
  return await getRequest(API_ROUTES.getReferral, true);
  // return await apiReq(API_ROUTES.getBanners, 'GET')
  //   .then((res: any) => {
  //     if (res?.status === 200) {
  //       return res?.data?.dataItems;
  //     } else {
  //       toast.error(res.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

export default {
  addReferral,
  getReferral,
};
