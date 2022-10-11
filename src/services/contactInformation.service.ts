import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { getRequest, putRequest } from 'src/helpers/apiCalls';

const getContactInformation = async () => {
  return await getRequest(API_ROUTES.contactInformation, true);
  // return await apiReq(API_ROUTES.getContactInformation, 'GET', {})
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

const editContactInformation = async (data: any) => {
  return await putRequest(API_ROUTES.contactInformation, data);
  // return await apiReq(API_ROUTES.editContactInformation, 'PUT', data)
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
  getContactInformation,
  editContactInformation,
};
