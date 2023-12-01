import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TAccount } from "../../../typings";
import AccountItemsDetails from "../../pages/items/AccountItemsDetails";
import AccountItemsTable from "../../pages/items/AccountItemsTable";
import AddNewItemForm from "../../pages/items/AddNewItemForm";

export default function AccountItemsView() {
  const params = useParams();
  const location = useLocation();

  const currentAccount = location.state.account as TAccount;
  const { id, bill, creditCard, customer } = currentAccount;

  const [showNewItemForm, setShowNewItemForm] = useState(false);

  return (
    <div>
      <h1 className="text-3xl mb-5 font-semibold text-neutral-500">Account Items</h1>

      <AccountItemsDetails
        account={currentAccount}
        showNewItemForm={showNewItemForm}
        setShowNewItemForm={setShowNewItemForm}
      />
      {showNewItemForm && <AddNewItemForm setShowNewItemForm={setShowNewItemForm} account={currentAccount} />}
      <AccountItemsTable />
    </div>
  );
}
