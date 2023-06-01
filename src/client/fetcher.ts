// fetcher.ts

import { BASE_URL } from '@/constant/constants';

const extractBody = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return res.text().then((text) => {
      console.log('Error: ', text);
      let errMessage;
      try {
        const err = JSON.parse(text);
        errMessage = err.message;
      } catch (error) {
        // do nothing
      }
      throw new Error(errMessage || text);
    });
  }
};

export const fetcher = async (
  url: string,
  body?: object,
  method = 'GET',
  isFormData = false
) => {
  const toFormData = (data) => {
    const formData = new FormData();
    for (const name in data) {
      formData.append(name, data[name]);
    }
    return formData;
  };

  const requestOptions: RequestInit = {
    method,
    headers: !isFormData
      ? {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      : {},
    credentials: 'include', // Include cookies in the request
  };

  if (body) {
    requestOptions.body = isFormData ? toFormData(body) : JSON.stringify(body);
  }

  return fetch(`${BASE_URL}${url}`, requestOptions).then((res) => {
    return extractBody(res);
  });
};
