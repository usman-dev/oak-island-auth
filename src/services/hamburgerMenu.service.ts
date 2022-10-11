import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getHamburgerCards = async () => {
  return await getRequest(API_ROUTES.hamburger);
};

const deleteHamburgerFeature = async (data) => {
  return await deleteRequest(API_ROUTES.hamburgerFeature, data);
};

const getHamburgerFeature = async (data: any) => {
  return await getRequest(`${API_ROUTES.hamburgerFeature}?id=${data}`);
};

const addHamburgerFeature = async (data: any) => {
  return await postRequest(API_ROUTES.hamburgerFeature, data);
};

export default {
  getHamburgerCards,
  deleteHamburgerFeature,
  getHamburgerFeature,
  addHamburgerFeature,
};
