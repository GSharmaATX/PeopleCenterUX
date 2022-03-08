import { useQuery } from "react-query";
import { PageRequest } from "../../shared/interfaces";
import { API_BASE_URL, getRequest } from "../../shared/constants";

export const useGetPersonNamesAPI = (
  pageRequest: PageRequest,
  firstName: string | null,
  lastName: string | null
) => {
  let requestParm = "&" + firstName ? firstName : "";
  requestParm += lastName ? "&" + lastName : "";
  let pageDetail = `?pageNumber=${pageRequest.pageNumber}&pageSize=${pageRequest.pageSize}&sortBy=${pageRequest.sortBy}&sortOrder=${pageRequest.sortOrder}&`;
  const url = API_BASE_URL + "person/person-names" + pageDetail + requestParm;
  return useQuery(
    ["get-person-names", requestParm, pageRequest.pageNumber],
    () => getRequest(url)
  );
};
export const useGetPersonDetailByPersonNameIdAPI = (personNameId: Number) => {
  const url =
    API_BASE_URL + `person/person-detail?personNameId=${personNameId}`;
  return useQuery(["get-person-detail", personNameId], () => getRequest(url));
};
