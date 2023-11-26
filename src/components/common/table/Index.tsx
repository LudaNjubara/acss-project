import { Edit, SortAscIcon, Trash } from "lucide-react";
import { formatDate } from "../../../lib/util/Utils";
import { TAction, TCustomer, TCustomerKey } from "../../../typings";

type TableProps = {
  isLoggedIn: boolean;
  data?: any[];
  columns: any[];
  onSort?: (field: TCustomerKey) => void;
  handleOpenModal: (customer: TCustomer, action: TAction) => void;
};

export const Table = ({ isLoggedIn, data, columns, onSort, handleOpenModal }: TableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-neutral-900">
      <table className="w-full overflow-x-auto divide-gray-200">
        <thead className="text-left">
          <tr>
            {columns.map((column) => (
              <th
                key={`${column.field} ${column?.nestedField}`}
                onClick={() => column.sortable && onSort && onSort(column.field)}
                scope="col"
                className={`px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900 cursor-pointer hover:bg-neutral-900/70 transition-colors duration-200 ${
                  column.field === "actions" && !isLoggedIn ? "hidden" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{column.headerName}</span>

                  <span>{column.sortable && <SortAscIcon size={18} className="opacity-50" />}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-900">
          {data?.map((row, idx) => (
            <tr
              key={`${Math.floor(Math.random() * 1000)} ${row.id}`}
              className={`${isLoggedIn ? (idx % 2 === 0 ? "bg-neutral-800" : "bg-neutral-800/60") : ""} ${
                isLoggedIn ? "hover:bg-neutral-900/50 cursor-pointer" : ""
              }`}
              onClick={(e) => {
                if (!isLoggedIn) return;
                e.stopPropagation();
                handleOpenModal(row, "view_accounts");
              }}
            >
              {columns.map((column) =>
                column.field === "actions" ? (
                  isLoggedIn && (
                    <td className="px-5 py-4" key={column.field}>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(row, "edit");
                          }}
                          className="p-2 rounded-md text-neutral-500 hover:text-neutral-200 hover:bg-neutral-700 transition-colors duration-200"
                        >
                          <Edit size={18} className="opacity-50" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenModal(row, "delete");
                          }}
                          className="p-2 rounded-md text-red-500 hover:text-red-300 hover:bg-red-600/60 transition-colors duration-200"
                        >
                          <Trash size={18} className="opacity-50" />
                        </button>
                      </div>
                    </td>
                  )
                ) : (
                  <td
                    key={`${Math.floor(Math.random() * 1000)} ${column.field} ${column?.nestedField}`}
                    className="px-5 py-4"
                  >
                    {column.hasOwnProperty("nestedField") && row[column.field]
                      ? column.nestedField === "date"
                        ? formatDate(new Date(row[column.field][column.nestedField]))
                        : row[column.field][column.nestedField] || (
                            <span className="text-neutral-400">N/A</span>
                          )
                      : row[column.field] || <span className="text-neutral-400">N/A</span>}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {data?.length === 0 && (
        <div className="flex flex-col items-center justify-center p-10">
          <h2 className="text-2xl font-semibold">No data found</h2>
          <p className="text-lg text-neutral-500">Try searching for something else</p>
        </div>
      )}
    </div>
  );
};
