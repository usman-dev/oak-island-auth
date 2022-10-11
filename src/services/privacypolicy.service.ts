import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { getRequest, putRequest } from 'src/helpers/apiCalls';

const getPrivacyPolicy = async () => {
  return await getRequest(API_ROUTES.getPrivacyPolicy, true);
  // return await apiReq(API_ROUTES.getPrivacyPolicy, 'GET', {})
  //   .then((res: any) => {
  //     if (res?.status === 200) {
  //       return res?.data?.results?.data;
  //     } else {
  //       toast.error(res?.response?.data?.errors[0]?.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

const editPrivacyPolicy = async (data: any) => {
  return await putRequest(API_ROUTES.editPrivacyPolicy, data);
  // return await apiReq(API_ROUTES.editPrivacyPolicy, 'PUT', data)
  //   .then((res: any) => {
  //     if (res?.status === 200) {
  //       return res?.data?.results?.data;
  //     } else {
  //       toast.error(res?.response?.data?.errors[0]?.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

export default {
  getPrivacyPolicy,
  editPrivacyPolicy,
};
