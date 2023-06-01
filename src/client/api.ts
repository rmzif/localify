import {fetcher} from "@/client/fetcher";

// user
// user
export const createUser = async (body: object) => {
  return fetcher('/api/user/createuser', body, 'POST');
};

export const loginUser = async (body: object) => {
  return fetcher('/api/user/login', body, 'POST');
};