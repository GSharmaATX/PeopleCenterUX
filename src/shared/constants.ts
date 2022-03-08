import axios from "axios";

export const DATE_FORMAT = "MM/DD/YYYY";
export const API_DATE_FORMAT = "YYYY-MM-DD";

let base_url = "http://localhost:8090/people-center/";

if (process.env.NODE_ENV === "production") {
  base_url = "http://34.201.243.203:8090/people-center/";
}
export const API_BASE_URL = base_url;

export const getRequest = async (url: string) => {
  const { data } = await axios.get(`${url}`);
  return data;
};

export const postRequest = async (url: string, payload: any) => {
  const { data } = await axios.post(url, payload);
  return data;
};

export const putRequest = async (url: string, payload: any) => {
  const { data } = await axios.put(url, payload);
};

export const deleteRequest = async (url: string) => {
  const { data } = await axios.delete(url);
};
