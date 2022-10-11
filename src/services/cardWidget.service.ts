import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getWidget = async (id) => {
  return await getRequest(`${API_ROUTES.cardWidget}?card=${id}`);

  // return await apiReq(API_ROUTES.getCategory, 'GET', {})
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

const deleteWidget = async (id: number) => {
  return await deleteRequest(API_ROUTES.cardWidget, { id });
  // return await apiReq(API_ROUTES.deleteCategory, 'DELETE', { id })
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

const addWidget = async (formsData: any) => {
  return await postRequest(API_ROUTES.cardWidget, formsData);
  // return await apiReq(API_ROUTES.addCategory, 'POST', data)
  //   .then((res: any) => {
  //     toast.success('Category added');
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

const editWidget = async (data: any) => {
  return await putRequest(API_ROUTES.cardWidget, data);
  // return await apiReq(API_ROUTES.editCategory, 'PUT', data)
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

const categoryBulkUpload = async (data: any) => {
  return await postRequest(API_ROUTES.cardWidget, data);
  // return await apiReq(API_ROUTES.categoryBulkUpload, 'POST', {
  //   categories: data,
  // })
  //   .then((res: any) => {
  //     if (res?.status === 201 || res?.status === 200) {
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

export default {
  getWidget,
  deleteWidget,
  addWidget,
  editWidget,
  categoryBulkUpload,
};
