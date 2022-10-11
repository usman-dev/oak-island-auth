import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { getRequest, postRequest, putRequest } from 'src/helpers/apiCalls';

//Categories
const addWalletImage = async (files: any) => {
  const formData = new FormData();

  files.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.walletImage, formData, true);
};

const editWalletImage = async (data: any) => {
  return await putRequest(API_ROUTES.walletImage, data);
};

const getWalletImage = async () => {
  return await getRequest(API_ROUTES.walletImage, true);
};

export default {
  addWalletImage,
  getWalletImage,
  editWalletImage,
};