import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getCardCategories = async (id) => {
  return await getRequest(`${API_ROUTES.cardCategory}?card=${id}`);
};

const getCardCategoriesEnums = async () => {
  return await getRequest(`${API_ROUTES.categoryEnums}`);
};

const deleteCardCategory = async (id: number) => {
  return await deleteRequest(API_ROUTES.cardCategory, { id });
};

const addCardCategories = async (data: any) => {
  return await postRequest(API_ROUTES.cardCategory, data);
};

const editCategory = async (data: any) => {
  return await putRequest(API_ROUTES.cardCategory, data);
};

const agentBulkUpload = async (data: any) => {
  return await postRequest(API_ROUTES.agentsBulkUpload, data, true);
};

const changeCategoryOrder = async (data) => {
  return await postRequest(API_ROUTES.cardCategoryOrder, data, true);
};

const changeMenuCardOrder = async (data) => {
  return await postRequest(API_ROUTES.menuCardOrder, data, true);
};

export default {
  getCardCategories,
  deleteCardCategory,
  addCardCategories,
  editCategory,
  agentBulkUpload,
  getCardCategoriesEnums,
  changeCategoryOrder,
  changeMenuCardOrder,
};
