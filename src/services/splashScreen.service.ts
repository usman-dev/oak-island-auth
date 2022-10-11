import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { getRequest, postRequest, putRequest } from 'src/helpers/apiCalls';

//Categories
const addSplashImage = async (files: any) => {
  const formData = new FormData();

  files.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.splashScreen, formData, true);
};

const editSplashImage = async (data: any) => {
  return await putRequest(API_ROUTES.splashScreen, data);
};

const getSplashImage = async () => {
  return await getRequest(API_ROUTES.splashScreen, true);
};

export default {
  addSplashImage,
  getSplashImage,
  editSplashImage,
};
