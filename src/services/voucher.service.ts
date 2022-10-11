import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from 'src/helpers/apiCalls';

//Categories
const getVoucher = async () => {
  return await getRequest(API_ROUTES.getCampaign);
};

const addVoucher = async (data: any) => {
  return await postRequest(API_ROUTES.createCampaign, data);
};

const editVoucher = async (data: any) => {
  return await putRequest(API_ROUTES.updateCampaign, data);
};

export default {
  addVoucher,
  editVoucher,
  getVoucher,
};
