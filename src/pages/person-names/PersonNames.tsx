import React from "react";
import { useGetPersonNamesAPI } from "./api-hooks";
import { personNamesTableColumns } from "./person-names-table-columns";
import PaginatedTable from "../../components/react-table/PaginatedTable";
import SelectTable from "../../components/react-table/SelectTable";

function PersonNames() {
  let pageRequest = {
    pageNumber: 0,
    pageSize: 100,
    sortBy: "firstName",
    sortOrder: "Ascending",
  };

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
  } = (personNamesResponse?.data || {}) as any;

  // This is example where pagination is performed automatically by the UI. Assumption here is the database call will get all data at once. This
  console.log(content);
  if (personNamesResponse?.isLoading) return <h1> Loading...</h1>;
  else if (personNamesResponse?.isSuccess)
    // return <PaginatedTable columns={personNamesTableColumns} data={content} />;
    return <SelectTable columns={personNamesTableColumns} data={content} />;
  else return <h1> something is wrong</h1>;
}

export default PersonNames;
