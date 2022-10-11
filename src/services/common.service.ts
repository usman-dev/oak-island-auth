import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { getRequest, postRequest } from 'src/helpers/apiCalls';

const getOtp = async () => {
  return await getRequest(API_ROUTES.common, true);
  // return await apiReq(API_ROUTES.getOtp, 'GET', {})
  //   .then((res: any) => {
  //     if (res?.status === 200) {
  //       return res?.data?.results?.dataItems;
  //     } else {
  //       toast.error(res.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

const addOtp = async (data: any) => {
  return await postRequest(API_ROUTES.common, data);
  // return await apiReq(API_ROUTES.addOtp, 'POST', data)
  //   .then((res: any) => {
  //     toast.success('Otp added');
  //     if (res?.status === 201) {
  //       return res?.data?.results?.data;
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
  getOtp,

  addOtp,
};
