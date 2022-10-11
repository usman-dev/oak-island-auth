import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getFaqs = async (id: any) => {
  return await getRequest(`${API_ROUTES.getFaq}?category=${id}`);
};

const deleteFaq = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteFaq, { id });
};

const addFaq = async (data: any) => {
  return await postRequest(API_ROUTES.addFaq, data);
};

const editFaq = async (data: any) => {
  return await putRequest(API_ROUTES.editFaq, data);
};

const getFaqCategories = async () => {
  return await getRequest(API_ROUTES.getFaqCategories);
};

const deleteFaqCategory = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteFaqCategory, { id });
};

const addFaqCategory = async (data: any) => {
  return await postRequest(API_ROUTES.addFaqCategory, data);
};

const editFaqCategory = async (data: any) => {
  return await putRequest(API_ROUTES.editFaqCategory, data);
};

export default {
  addFaq,
  editFaq,
  getFaqs,
  deleteFaq,
  addFaqCategory,
  editFaqCategory,
  getFaqCategories,
  deleteFaqCategory,
};
