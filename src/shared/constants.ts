import axios from "axios";

export const DATE_FORMAT = "MM/DD/YYYY";
export const API_DATE_FORMAT = "YYYY-MM-DD";

let base_url = "http://localhost:8090/people-center/";

if (process.env.NODE_ENV === "production") {
  if (process.env.REACT_APP_API_API_BASE_URL_AWS) {
    base_url = process.env.REACT_APP_API_API_BASE_URL_AWS;
  }
}
export const API_BASE_URL = base_url;

export const getRequest = async (url: string, JWTToken: string) => {
  const { data } = await axios.get(`${url}`, {
    headers: { Authorization: `Bearer ${JWTToken}` },
  });
  console.log(`Bearer ${JWTToken}`);
  return data;
};

export const postRequest = async (
  url: string,
  payload: any,
  JWTToken: string
) => {
  const { data } = await axios.post(url, payload, {
    headers: { Authorization: `Bearer ${JWTToken}` },
  });
  return data;
};

export const putRequest = async (
  url: string,
  payload: any,
  JWTToken: string
) => {
  const { data } = await axios.put(url, payload, {
    headers: { Authorization: `Bearer ${JWTToken}` },
  });
};

export const deleteRequest = async (url: string, JWTToken: string) => {
  const { data } = await axios.delete(url, {
    headers: { Authorization: `Bearer ${JWTToken}` },
  });
};
