import useGlobalStore from "../../../lib/store/GlobalStore";
import { TAccount, TAccountsTableColumn } from "../../../typings";
import { Table } from "../../common/table/Index";

const accountsColumns: TAccountsTableColumn[] = [
  { field: "id", headerName: "Id", sortable: false },
  { field: "bill", nestedField: "billNumber", headerName: "Bill No.", sortable: false },
  { field: "bill", nestedField: "date", headerName: "Date", sortable: false },
  { field: "creditCard", nestedField: "type", headerName: "Credit Card", sortable: false },
  { field: "creditCard", nestedField: "cardNumber", headerName: "Card Number", sortable: false },
  { field: "creditCard", nestedField: "expirationYear", headerName: "Expiration", sortable: false },
];

type TAccountsTableProps = {
  data?: TAccount[];
};

export default function AccountsTable({ data }: TAccountsTableProps) {
  // zustand state and actions
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);
  const numOfCustomersToShow = useGlobalStore((state) => state.numOfCustomersToShow);
  const setNumOfCustomersToShow = useGlobalStore((state) => state.setNumOfCustomersToShow);
  const sort = useGlobalStore((state) => state.sort);
  const setSort = useGlobalStore((state) => state.setSort);
  const order = useGlobalStore((state) => state.order);
  const setOrder = useGlobalStore((state) => state.setOrder);

  const handleOpenModal = () => {
    console.log("open modal");
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-lg text-neutral-500">
            Showing <span className="px-1 font-semibold">{data?.length || 0}</span> account(s)
          </p>
        </div>

        <Table
          isLoggedIn={isLoggedIn}
          data={data}
          columns={accountsColumns}
          handleOpenModal={handleOpenModal}
        />
      </div>
    </>
  );
}
