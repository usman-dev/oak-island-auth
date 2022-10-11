import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { apiReq } from 'src/helpers/apiRequests';
import { toast } from 'react-toastify';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

//Categories
const getBillCategories = async () => {
  return await getRequest(API_ROUTES.getBillCategory);
};

const deleteBillCategory = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteBillCategory, { id });
};

const addBillCategory = async (data: any, file: any) => {
  const formData = new FormData();

  formData.append('categoryName', data.categoryName);
  file.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.addBillCategory, formData);
};

const editBillCategory = async (data: any) => {
  const { id, categoryName, file, key } = data;
  const formData = new FormData();

  if (key) {
    formData.append('key', key);
  }

  formData.append('categoryName', categoryName);
  formData.append('id', id);
  file.forEach((item) => {
    formData.append('image', item);
  });
  return await putRequest(API_ROUTES.editBillCategory, formData);
};

//Companies
const getBillCompanies = async (billCategory: any) => {
  return await getRequest(
    `${API_ROUTES.getBillCompany}?billCategory=${billCategory}`,
  );
};

const deleteBillCompany = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteBillCompany, { id });
};

const addBillCompany = async (data: any, file: any) => {
  const {
    companyName,
    billShortCode,
    paymentType,
    referenceNumberLength,
    billCategory,
  } = data;
  const formData = new FormData();

  formData.append('companyName', companyName);
  formData.append('billShortCode', billShortCode);
  formData.append('paymentType', paymentType);
  formData.append('billCategory', billCategory);
  formData.append('referenceNumberLength', referenceNumberLength);
  file.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.addBillCompany, formData);
};

const editBillCompany = async (data: any, file: any) => {
  const {
    companyName,
    billShortCode,
    paymentType,
    referenceNumberLength,
    billCategoryId,
    key,
    id,
  } = data;
  const formData = new FormData();

  if (key) {
    formData.append('key', key);
  }

  formData.append('id', id);
  formData.append('companyName', companyName);
  formData.append('billShortCode', billShortCode);
  formData.append('paymentType', paymentType);
  formData.append('billCategoryId', billCategoryId);
  formData.append('referenceNumberLength', referenceNumberLength);
  file.forEach((item) => {
    formData.append('image', item);
  });
  return await putRequest(API_ROUTES.editBillCompany, formData);
};

export default {
  addBillCategory,
  editBillCategory,
  getBillCategories,
  deleteBillCategory,

  addBillCompany,
  editBillCompany,
  getBillCompanies,
  deleteBillCompany,
};
