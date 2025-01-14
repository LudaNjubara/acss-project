import { useState } from "react";

import { useCustomers } from "../../../hooks/useCustomers";
import useGlobalStore from "../../../lib/store/GlobalStore";
import { TUseCustomersOptions } from "../../../typings";
import TablePagination from "../../common/table/TablePagination";
import CustomersSearch from "./CustomersSearch";
import CustomersTable from "./CustomersTable";

export default function Customers() {
  // zustand state and actions
  const numOfCustomersToShow = useGlobalStore((state) => state.numOfCustomersToShow);
  const sort = useGlobalStore((state) => state.sort);
  const order = useGlobalStore((state) => state.order);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const customersOptions: TUseCustomersOptions = {
    page: currentPage,
    limit: numOfCustomersToShow,
    sort,
    order,
    searchQuery,
  };

  const { data, numOfPages, error } = useCustomers(customersOptions);

  return (
    <div className="flex flex-col gap-10 px-3">
      <CustomersSearch setSearchQuery={setSearchQuery} />
      <CustomersTable data={data} />

      {!!numOfPages && (
        <TablePagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={numOfPages} />
      )}

      {error && (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
