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
const addBanner = async (files: any, dataforPost: any) => {
  const formData = new FormData();

  files.forEach((item) => {
    formData.append('file', item);
  });
  return await postRequest(API_ROUTES.addBanners, formData, true);
};

const getBanner = async () => {
  return await getRequest(API_ROUTES.getBanners);
};

const deleteBanner = async (data: any) => {
  return await deleteRequest(API_ROUTES.deleteBanner, data);
};

const editBannerVisible = async (dataforPost: any) => {
  const { id, visible } = dataforPost;

  return await putRequest(API_ROUTES.editBanner, { id, visible });
};

const editBanner = async (files: any, dataforPost: any) => {
  const { id, key } = dataforPost;
  const formData = new FormData();

  formData.append('key', key);
  formData.append('id', id);

  files.forEach((item) => {
    formData.append('image', item);
  });
  return await putRequest(API_ROUTES.editBanner, formData);
};

const changeBannersOrder = async (data) => {
  return await postRequest(API_ROUTES.bannersOrder, data, true);
};

export default {
  addBanner,
  getBanner,
  deleteBanner,
  editBanner,
  editBannerVisible,
  changeBannersOrder,
};
