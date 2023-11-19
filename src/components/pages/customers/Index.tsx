import { useState } from "react";

import { useCustomers } from "../../../hooks/CustomersHooks";
import { TUseCustomersOptions } from "../../../typings";
import CustomersPagination from "./CustomersPagination";
import CustomersSearch from "./CustomersSearch";
import CustomersTable from "./CustomersTable";

export default function Customers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const customersOptions: TUseCustomersOptions = {
    page: currentPage,
    limit: 10,
    searchQuery,
  };

  const { data: customersData, error } = useCustomers(customersOptions);

  return (
    <div className="flex flex-col gap-10 px-3">
      <CustomersSearch setSearchQuery={setSearchQuery} />
      <CustomersTable data={customersData} />
      {!searchQuery && <CustomersPagination currentPage={currentPage} setCurrentPage={setCurrentPage} />}

      {error && (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
