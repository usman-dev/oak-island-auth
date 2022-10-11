import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getFeedbackCategory = async () => {
  return await getRequest(API_ROUTES.getFeedbackCategory);
};

const addFeedbackCategory = async (data: any) => {
  return await postRequest(API_ROUTES.addFeedbackCategory, data);
};

const editFeedbackCategory = async (data: any) => {
  return await putRequest(API_ROUTES.editFeedbackCategory, data);
};

const deleteFeedbackCategory = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteFeedbackCategory, {
    categoryID: id,
  });
};

export default {
  addFeedbackCategory,
  getFeedbackCategory,
  editFeedbackCategory,
  deleteFeedbackCategory,
};
