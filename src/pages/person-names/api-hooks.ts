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
  const idToken = String(localStorage.getItem("idToken"));
  return useQuery(
    ["get-person-names", requestParm, pageRequest.pageNumber],
    () => getRequest(url, idToken)
  );
};
export const useGetPersonDetailByPersonNameIdAPI = (personNameId: Number) => {
  const url =
    API_BASE_URL + `person/person-detail?personNameId=${personNameId}`;
  const idToken = "" + localStorage.getItem("idToken");
  return useQuery(["get-person-detail", personNameId], () =>
    getRequest(url, idToken)
  );
};
