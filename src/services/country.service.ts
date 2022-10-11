import { toast } from 'react-toastify';
import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getCountries = async () => {
  return await getRequest(API_ROUTES.country);
};

const deleteCountry = async (id: number) => {
  return await deleteRequest(API_ROUTES.country, { id });
};

const addCountry = async (data: any, file: any) => {
  const { countryCode, countryName, currency, phonePrefix } = data;
  const formData = new FormData();

  formData.append('countryCode', countryCode);
  formData.append('countryName', countryName);
  formData.append('currency', currency);
  formData.append('phonePrefix', phonePrefix);

  file.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.country, formData);
};

const editCountry = async (data: any, file: any) => {
  const { countryCode, countryName, currency, phonePrefix, id, flagKey } = data;
  const formData = new FormData();

  if (flagKey) {
    formData.append('flagKey', flagKey);
  }

  formData.append('id', id);
  formData.append('countryCode', countryCode);
  formData.append('countryName', countryName);
  formData.append('currency', currency);
  formData.append('phonePrefix', phonePrefix);

  file.forEach((item) => {
    formData.append('image', item);
  });
  return await putRequest(API_ROUTES.country, formData);
};

const countryBulkUpload = async (data: any) => {
  return await postRequest(API_ROUTES.countriesBulkUpload, data, true);
};

export default {
  getCountries,
  deleteCountry,
  addCountry,
  editCountry,
  countryBulkUpload,
};
