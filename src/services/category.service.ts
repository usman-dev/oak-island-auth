import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

const getCategories = async () => {
  return await getRequest(API_ROUTES.getCategory);
};

const deleteCategories = async (id: number) => {
  return await deleteRequest(API_ROUTES.deleteCategory, { id });
  // return await apiReq(API_ROUTES.deleteCategory, 'DELETE', { id })
  //   .then((res: any) => {
  //     if (res?.status === 200) {
  //       return res?.data?.results?.data;
  //     } else {
  //       toast.error(res.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

const addCategory = async (data: any) => {
  return await postRequest(API_ROUTES.addCategory, data);
  // return await apiReq(API_ROUTES.addCategory, 'POST', data)
  //   .then((res: any) => {
  //     toast.success('Category added');
  //     if (res?.status === 201) {
  //       return res?.data?.results?.data;
  //     } else {
  //       toast.error(res.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

const editCategory = async (data: any, file: any, activeFile: any) => {
  const { id, categoryName, categoryIconKey, activeCategoryIconKey } = data;
  const formData = new FormData();

  if (categoryIconKey) {
    formData.append('categoryIconKey', categoryIconKey);
  }

  if (activeCategoryIconKey) {
    formData.append('activeCategoryIconKey', activeCategoryIconKey);
  }

  formData.append('categoryName', categoryName);
  formData.append('id', id);
  file.forEach((item) => {
    formData.append('categoryIcon', item);
  });
  activeFile.forEach((item) => {
    formData.append('activeCategoryIcon', item);
  });
  return await putRequest(API_ROUTES.editCategory, formData);
};

const categoryBulkUpload = async (data: any) => {
  return await postRequest(API_ROUTES.categoryBulkUpload, data, true);
  // return await apiReq(API_ROUTES.categoryBulkUpload, 'POST', {
  //   categories: data,
  // })
  //   .then((res: any) => {
  //     if (res?.status === 201 || res?.status === 200) {
  //       return res?.data?.results?.dataItems;
  //     } else {
  //       toast.error(res.message);
  //     }
  //     return null;
  //   })
  //   .catch(() => {
  //     toast.error('Something went wrong!');
  //   });
};

export default {
  getCategories,
  deleteCategories,
  addCategory,
  editCategory,
  categoryBulkUpload,
};
