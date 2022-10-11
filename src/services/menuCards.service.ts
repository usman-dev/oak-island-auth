import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getMenuCards = async () => {
  return await getRequest(API_ROUTES.card);
  // return await apiReq(API_ROUTES.card, 'GET', {})
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

const deleteMenuCards = async (id: number) => {
  return await deleteRequest(API_ROUTES.card, { id });
  // return await apiReq(API_ROUTES.card, 'DELETE', { id })
  //   .then((res: any) => {
  //     if (res?.status === 200) {
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

const addMenuCards = async (data: any) => {
  return await postRequest(API_ROUTES.card, data);
  // return await apiReq(API_ROUTES.card, 'POST', data)
  //   .then((res: any) => {
  //     if (res?.status === 201) {
  //       toast.success('Card added');
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

const editMenuCards = async (data: any) => {
  return await putRequest(API_ROUTES.card, data);
  // return await apiReq(API_ROUTES.card, 'PUT', data)
  //   .then((res: any) => {
  //     if (res?.status === 200) {
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
  getMenuCards,
  deleteMenuCards,
  addMenuCards,
  editMenuCards,
};
