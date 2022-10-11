import { API_ROUTES } from 'src/helpers/apiRoutes.constants';
import { postRequest } from 'src/helpers/apiCalls';

const getLogs = async (data) => {
  const { limit, page } = data;
  return await postRequest(
    `${API_ROUTES.logs}?limit=${limit}&page=${page}`,
    data,
  );
};

export default {
  getLogs,
};
