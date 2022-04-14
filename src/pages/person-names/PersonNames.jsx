import React from "react";
import { useGetPersonNamesAPI } from "./api-hooks";
import { personNamesTableColumns } from "./person-names-table-columns";
import PaginatedTable from "../../components/react-table/PaginatedTable";
import SelectTable from "../../components/react-table/SelectTable";
import Logout from "../../components/Logout";
import { useNavigate } from "react-router-dom";

function PersonNames() {
  let pageRequest = {
    pageNumber: 0,
    pageSize: 100,
    sortBy: "firstName",
    sortOrder: "Ascending",
  };

  const navigate = useNavigate();
  const personNamesResponse = useGetPersonNamesAPI(pageRequest, null, null);

  const {
    content,
    pageable,
    last,
    totalElements,
    totalPages,
    size,
    number,
    sort,
    first,
    numberOfElements,
    empty,
  } = personNamesResponse?.data || {};

  // This is example where pagination is performed automatically by the UI. Assumption here is the database call will get all data at once. This

  if (personNamesResponse?.isLoading) return <h1> Loading...</h1>;
  else if (personNamesResponse?.isSuccess)
    // return <PaginatedTable columns={personNamesTableColumns} data={content} />;
    return (
      <div>
        <SelectTable columns={personNamesTableColumns} data={content} />
      </div>
    );
  else if (personNamesResponse?.isError) {
    // Error code 403 indicates authentication issue. Navigate to the login page.
    // if (personNamesResponse.error.response.status === 403) navigate("/");
    return <h1>{personNamesResponse.error.message}</h1>;
  } else return <h1> Something is wrong...</h1>;
}

export default PersonNames;
