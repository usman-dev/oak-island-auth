import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getTopups = async () => {
  return await getRequest(`${API_ROUTES.topup}`);
};

const deleteTopup = async (data: any) => {
  return await deleteRequest(API_ROUTES.topup, data);
};

const addTopup = async (data: any, file: any) => {
  const { operatorName, productId, billTypes, numberTypes } = data;
  const formData = new FormData();

  formData.append('operatorName', operatorName);
  formData.append('productId', productId);
  formData.append('billTypes', JSON.stringify(billTypes));
  formData.append('numberTypes', JSON.stringify(numberTypes));

  file.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.topup, formData, false, true);
};

const editTopup = async (data: any, file: any) => {
  const { operatorName, productId, billTypes, numberTypes, key, id } = data;
  const formData = new FormData();

  if (key) {
    formData.append('key', key);
  }

  formData.append('id', id);
  formData.append('operatorName', operatorName);
  formData.append('productId', productId);
  formData.append('billTypes', JSON.stringify(billTypes));
  formData.append('numberTypes', JSON.stringify(numberTypes));

  file.forEach((item) => {
    formData.append('image', item);
  });
  return await putRequest(API_ROUTES.topup, formData);
};

export default {
  getTopups,
  deleteTopup,
  addTopup,
  editTopup,
};
