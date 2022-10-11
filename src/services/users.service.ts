// import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
// import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getUsers = async () => {
  return await getRequest(API_ROUTES.getUsers);
};

const deleteUser = async (data: any) => {
  return await deleteRequest(API_ROUTES.deleteUser, data);
};

const addUser = async (data: any) => {
  return await postRequest(API_ROUTES.createUser, data, false, true);
  // return await postRequest(API_ROUTES.createUser, data);
};

const editUser = async (data: any) => {
  return await putRequest(API_ROUTES.editUser, data);
};

export default {
  getUsers,
  deleteUser,
  addUser,
  editUser,
};
