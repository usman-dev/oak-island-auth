import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getSecretQuestions = async () => {
  return await getRequest(API_ROUTES.secretQuestion);
};

const deleteSecretQuestion = async (id: number) => {
  return await deleteRequest(API_ROUTES.secretQuestion, { id });
};

const addSecretQuestion = async (data: any) => {
  return await postRequest(API_ROUTES.secretQuestion, data);
};

const editSecretQuestion = async (data: any) => {
  return await putRequest(API_ROUTES.secretQuestion, data);
};

// const agentBulkUpload = async (data: any) => {
//   return await postRequest(API_ROUTES.agentsBulkUpload, data, true);
// };

export default {
  getSecretQuestions,
  deleteSecretQuestion,
  addSecretQuestion,
  editSecretQuestion,
  // agentBulkUpload,
};
