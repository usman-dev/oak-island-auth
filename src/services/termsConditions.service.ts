import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { getRequest, putRequest } from 'src/helpers/apiCalls';

const getTermsCondition = async () => {
  return await getRequest(API_ROUTES.getTermCondition);
  // return await apiReq(API_ROUTES.getTermCondition, 'GET', {})
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

const editTermsCondition = async (data: any) => {
  return await putRequest(API_ROUTES.editTermCondition, data);
  // return await apiReq(API_ROUTES.editTermCondition, 'PUT', data)
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
  getTermsCondition,
  editTermsCondition,
};
