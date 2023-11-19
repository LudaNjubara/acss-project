import { Edit, Trash } from "lucide-react";
import useGlobalStore from "../../../lib/store/GlobalStore";
import { TCustomer } from "../../../typings";

const numOfCustomersToShowDropdownOptions = [10, 25, 50, 100];

type TCustomersTableProps = {
  data?: TCustomer[];
};

export default function CustomersTable({ data }: TCustomersTableProps) {
  // zustand state and actions
  const numOfCustomersToShow = useGlobalStore((state) => state.numOfCustomersToShow);
  const setNumOfCustomersToShow = useGlobalStore((state) => state.setNumOfCustomersToShow);

  const handleEdit = (customer: TCustomer) => {
    console.log("Edit", customer);
  };

  const handleDelete = (customer: TCustomer) => {
    console.log("Delete", customer);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <p className="text-lg text-neutral-500">
          Showing <span className="px-1 font-semibold">{data?.length || 0}</span> customer(s)
        </p>

        <div className="flex items-center gap-2">
          <label htmlFor="numOfCustomersToShow" className="text-lg text-neutral-500">
            Show
          </label>
          <select
            name="numOfCustomersToShow"
            id="numOfCustomersToShow"
            defaultValue={numOfCustomersToShow}
            onChange={(e) => setNumOfCustomersToShow(Number(e.target.value))}
            className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
          >
            {numOfCustomersToShowDropdownOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="text-lg text-neutral-500">customers per page</span>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border-2 border-neutral-900">
        <table className="w-full overflow-x-auto">
          <thead className="text-left">
            <tr>
              <th className="px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900">Name</th>
              <th className="px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900">Surname</th>
              <th className="px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900">Email</th>
              <th className="px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900">Telephone</th>
              <th className="px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-900">
            {data?.map((customer, idx) => (
              <tr key={customer.id} className={`${idx % 2 === 0 ? "bg-neutral-800" : "bg-neutral-800/60"}`}>
                <td className="px-5 py-4">{customer.name}</td>
                <td className="px-5 py-4">{customer.surname}</td>
                <td className="px-5 py-4">{customer.email}</td>
                <td className="px-5 py-4">{customer.telephone}</td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(customer)}
                      className="text-neutral-500 hover:text-neutral-200"
                    >
                      <Edit size={18} className="opacity-50" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(customer)}
                      className="text-red-500 hover:text-red-300"
                    >
                      <Trash size={18} className="opacity-50" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <div className="flex flex-col items-center justify-center p-10">
            <h2 className="text-2xl font-semibold">No customers found</h2>
            <p className="text-lg text-neutral-500">Try searching for another customer</p>
          </div>
        )}
      </div>
    </div>
  );
}
