import { TAccount } from "../../../typings";

type TAccountItemsDetailsProps = {
  account: TAccount;
  showNewItemForm: boolean;
  setShowNewItemForm: (showNewItemForm: boolean) => void;
};

export default function AccountItemsDetails({
  account,
  showNewItemForm,
  setShowNewItemForm,
}: TAccountItemsDetailsProps) {
  return (
    <div className="flex justify-between gap-10 pt-8">
      <h2 className="text-5xl font-semibold text-neutral-300">
        {account.customer.name} {account.customer.surname}
      </h2>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 p-5 bg-neutral-900 rounded shadow-md">
          <h2 className="text-2xl font-bold text-neutral-400 mb-4 underline underline-offset-4">
            Account Details
          </h2>
          <p className="text-md text-neutral-400 flex justify-between gap-4">
            <span className="font-semibold text-neutral-100">Customer ID:</span> {account.customer.id}
          </p>
          <p className="text-md text-neutral-400 flex justify-between gap-4">
            <span className="font-semibold text-neutral-100">Bill ID:</span> {account.bill.id}
          </p>
          <p className="text-md text-neutral-400 flex justify-between gap-4">
            <span className="font-semibold text-neutral-100">Telephone:</span> {account.customer.telephone}
          </p>
          <p className="text-md text-neutral-400 flex justify-between gap-4">
            <span className="font-semibold text-neutral-100">Email:</span> {account.customer.email}
          </p>
        </div>

        <button
          type="button"
          className="rounded bg-neutral-900 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out disabled:opacity-50"
          onClick={() => setShowNewItemForm(true)}
          disabled={showNewItemForm}
        >
          New Item
        </button>
      </div>
    </div>
  );
}
