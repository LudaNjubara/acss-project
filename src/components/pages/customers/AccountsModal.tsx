import { useAccounts } from "../../../hooks/CustomersHooks";
import { TAction, TCustomer, TUseAccountsOptions } from "../../../typings";
import AccountsPagination from "./AccountsPagination";
import AccountsTable from "./AccountsTable";

type TAccountsModalProps = {
  currentActionState: {
    action: TAction;
    customer: TCustomer | null;
  };
};

export default function AccountsModal({ currentActionState }: TAccountsModalProps) {
  const customer = currentActionState.customer;
  const accountsOptions: TUseAccountsOptions = {
    page: 1,
    limit: 10,
    customerId: customer?.id,
  };
  const { data, error } = useAccounts(accountsOptions);

  return (
    <>
      <h2 className="text-3xl mb-5 font-semibold">
        {currentActionState.customer?.name} {currentActionState.customer?.surname}{" "}
        <span className="text-lg text-neutral-400">accounts</span>
      </h2>
      <AccountsTable data={data} />
      <AccountsPagination />

      {error && (
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-semibold">Error</h2>
          <p className="text-lg text-red-500">{error}</p>
        </div>
      )}
    </>
  );
}
