import { useState } from "react";

import { TCustomer } from "../../../typings";
import CustomersSearch from "./CustomersSearch";
import CustomersTable from "./CustomersTable";

export default function Customers() {
  const [customersData, setCustomersData] = useState<TCustomer[]>([]);
  const [responseError, setResponseError] = useState("");

  return (
    <div className="flex flex-col gap-10 px-3">
      <CustomersSearch setCustomersData={setCustomersData} setResponseError={setResponseError} />
      <CustomersTable data={customersData} />

      {responseError && (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-lg text-red-500">{responseError}</p>
        </div>
      )}
    </div>
  );
}
