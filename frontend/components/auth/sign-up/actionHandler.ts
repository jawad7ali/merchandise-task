import api from "../../../lib/services";
import apiEndpoints from "../../../config/apiEndpoints";

// Auth operation and save
const useCustomHook = () => {
  const { SIGNUP } = apiEndpoints;
  const signup = async (body: any): Promise<any> => {
    const data = await api.post(SIGNUP, body);
    return data;
  };

  return {
    signup,
  };
};

export default useCustomHook;
