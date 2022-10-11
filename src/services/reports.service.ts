import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { getRequest } from 'src/helpers/apiCalls';

//Categories

const getRegistationReports = async (data?: any) => {
  const qs = Object.keys(data || {})
    .map((key) => `${key}=${data[key]}`)
    .join('&');
  return await getRequest(`${API_ROUTES.getRegisterReport}?${qs}`);
};

const getReferralReports = async (data?: any) => {
  const qs = Object.keys(data || {})
    .map((key) => `${key}=${data[key]}`)
    .join('&');
  return await getRequest(`${API_ROUTES.getReferralReport}?${qs}`);
};

const getCampaignReports = async (data?: any) => {
  const qs = Object.keys(data || {})
    .map((key) => `${key}=${data[key]}`)
    .join('&');
  return await getRequest(`${API_ROUTES.getCampaignReport}?${qs}`);
};

export default {
  getCampaignReports,
  getReferralReports,
  getRegistationReports,
};
