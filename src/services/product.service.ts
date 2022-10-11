import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const addAmount = async (data: any[], type = '') => {
  return await postRequest(`${API_ROUTES.addAmount}?type=${type}`, {
    amounts: data,
  });
};

const getAmount = async (type = '') => {
  return await getRequest(`${API_ROUTES.getAmount}?type=${type}`);
};

const getBanks = async () => {
  return await getRequest(API_ROUTES.getBank);
};

const deleteAmount = async (amount: number) => {
  return await deleteRequest(API_ROUTES.deleteAmount, { amount });
};

const deleteBank = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteBank, { id });
};

const addBank = async (data: any, editor: any) => {
  data.accountMessageFormat = editor;
  return await postRequest(API_ROUTES.addBank, data);
};

const editBank = async (data: any, editor: any) => {
  data.accountMessageFormat = editor;
  return await putRequest(API_ROUTES.updateBank, data);
};

export default {
  addAmount,
  getAmount,
  deleteAmount,
  addBank,
  editBank,
  getBanks,
  deleteBank,
};
