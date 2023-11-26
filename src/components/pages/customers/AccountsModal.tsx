import { useState } from "react";
import { useAccounts } from "../../../hooks/CustomersHooks";
import { TOTAL_ACCOUNTS_PAGES } from "../../../lib/constants/Index";
import { TAction, TCustomer, TUseAccountsOptions } from "../../../typings";
import TablePagination from "../../common/table/TablePagination";
import AccountsTable from "./AccountsTable";

type TAccountsModalProps = {
  currentActionState: {
    action: TAction;
    customer: TCustomer | null;
  };
};

export default function AccountsModal({ currentActionState }: TAccountsModalProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsLimit] = useState(10);

  const customer = currentActionState.customer;
  const accountsOptions: TUseAccountsOptions = {
    page: currentPage,
    limit: accountsLimit,
    customerId: customer?.id,
  };

  const { data, error } = useAccounts(accountsOptions);

  return (
    <div className="flex flex-col gap-10 px-3">
      <h2 className="text-3xl mb-5 font-semibold">
        {currentActionState.customer?.name} {currentActionState.customer?.surname}{" "}
        <span className="text-lg text-neutral-400">accounts</span>
      </h2>
      <AccountsTable data={data} />
      <TablePagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={TOTAL_ACCOUNTS_PAGES}
      />

      {error && (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
