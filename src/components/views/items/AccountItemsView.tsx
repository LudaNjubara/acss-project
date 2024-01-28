import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useAccountItems } from "../../../hooks/useAccountItems";
import { TAccount, TAccountItemsOptions } from "../../../typings";
import TablePagination from "../../common/table/TablePagination";
import AccountItemsDetails from "../../pages/items/AccountItemsDetails";
import AccountItemsTable from "../../pages/items/AccountItemsTable";
import AddNewItemForm from "../../pages/items/AddNewItemForm";

export default function AccountItemsView() {
  const location = useLocation();

  const currentAccount = location.state.account as TAccount;

  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [accountsLimit] = useState(7);

  const accountItemsOptions: TAccountItemsOptions = {
    page: currentPage,
    limit: accountsLimit,
    billId: currentAccount.bill.id,
  };

  const { data, numOfPages, error } = useAccountItems(accountItemsOptions);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl mb-5 font-semibold text-neutral-500">Account Items</h1>

      <AccountItemsDetails
        account={currentAccount}
        showNewItemForm={showNewItemForm}
        setShowNewItemForm={setShowNewItemForm}
      />
      {showNewItemForm && <AddNewItemForm setShowNewItemForm={setShowNewItemForm} account={currentAccount} />}
      <AccountItemsTable data={data} />
      {!!numOfPages && (
        <TablePagination totalPages={numOfPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
    </div>
  );
}
