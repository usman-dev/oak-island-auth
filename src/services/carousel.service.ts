import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

//Categories
const getCarousel = async () => {
  return await getRequest(API_ROUTES.carousel);
};

const deleteCarousel = async (id: number) => {
  return await deleteRequest(API_ROUTES.carousel, { id });
};

const addCarousel = async (data: any, file: any) => {
  const { title, subtitle } = data;
  const formData = new FormData();

  formData.append('title', title);
  formData.append('subtitle', subtitle);

  file.forEach((item) => {
    formData.append('image', item);
  });
  return await postRequest(API_ROUTES.carousel, formData);
};

const editCarousel = async (data: any, file: any) => {
  const { id, title, subtitle, key } = data;

  const formData = new FormData();

  if (key) {
    formData.append('key', key);
  }

  formData.append('id', id);
  formData.append('title', title);
  formData.append('subtitle', subtitle);

  file.forEach((item) => {
    formData.append('image', item);
  });
  return await putRequest(API_ROUTES.carousel, formData);
};

const changeCarouselOrder = async (data) => {
  return await postRequest(API_ROUTES.carouselOrder, data, true);
};

export default {
  addCarousel,
  editCarousel,
  getCarousel,
  deleteCarousel,
  changeCarouselOrder,
};
