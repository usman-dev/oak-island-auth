import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { getRequest, postRequest } from 'src/helpers/apiCalls';

const getAccountSetting = async (type = '') => {
  return await getRequest(`${API_ROUTES.accountSettings}?type=${type}`);
};

const addAccountSetting = async (data: any) => {
  return await postRequest(API_ROUTES.accountSettings, data);
};

export default {
  getAccountSetting,
  addAccountSetting,
};
