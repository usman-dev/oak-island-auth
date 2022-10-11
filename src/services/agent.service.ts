import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getAgents = async () => {
  return await getRequest(API_ROUTES.getAgent);
};

const deleteAgent = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteAgent, { id });
};

const addAgent = async (data: any) => {
  return await postRequest(API_ROUTES.addAgent, data);
};

const editAgent = async (data: any) => {
  return await putRequest(API_ROUTES.editAgent, data);
};

const agentBulkUpload = async (data: any) => {
  return await postRequest(API_ROUTES.agentsBulkUpload, data, true);
};

export default {
  getAgents,
  deleteAgent,
  addAgent,
  editAgent,
  agentBulkUpload,
};
