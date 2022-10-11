import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getNotifications = async () => {
  return await getRequest(API_ROUTES.getNotifications);
};

const deleteNotifications = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteNotifications, { id });
};

const addNotifications = async (data: any) => {
  return await postRequest(API_ROUTES.addNotifications, data);
};

const editNotifications = async (data: any) => {
  return await postRequest(API_ROUTES.editNotifications, data);
};

export default {
  addNotifications,
  editNotifications,
  getNotifications,
  deleteNotifications,
};
