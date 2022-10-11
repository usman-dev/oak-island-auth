import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getParishs = async (countryId: any = '') => {
  let url = '';

  if (countryId !== '') url = `${API_ROUTES.getParish}?countryId=${countryId}`;
  else url = `${API_ROUTES.getParish}`;

  return await getRequest(url);
};

const deleteParish = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteParish, { id });
};

const addParish = async (data: any) => {
  return await postRequest(API_ROUTES.addParish, data);
};

const editParish = async (data: any) => {
  return await putRequest(API_ROUTES.editParish, data);
};

const parishBulkUpload = async (data: any) => {
  return await postRequest(API_ROUTES.parishBulkUpload, data, true);
};

export default {
  addParish,
  editParish,
  getParishs,
  deleteParish,
  parishBulkUpload,
};
