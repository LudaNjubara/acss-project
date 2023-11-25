import { MouseEvent } from "react";
import { Edit, SortAscIcon, Trash } from "lucide-react";
import {
  TAction,
  TCustomer,
  TCustomerColumn,
  TCustomerKey,
} from "../../../typings";

type TableProps = {
  isLoggedIn: boolean;
  data?: any[];
  columns: TCustomerColumn[];
  onSort?: (field: TCustomerKey) => void;
  handleOpenModal: (
    customer: TCustomer,
    action: TAction,
    e: MouseEvent<HTMLTableRowElement>
  ) => void;
};

export const Table = ({
  isLoggedIn,
  data,
  columns,
  onSort,
  handleOpenModal,
}: TableProps) => {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-neutral-900">
      <table className="w-full overflow-x-auto divide-gray-200">
        <thead className="text-left">
          <tr>
            {columns.map((column) => (
              <th
                key={column.field}
                onClick={() =>
                  column.sortable && onSort && onSort(column.field)
                }
                scope="col"
                className={`px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900 cursor-pointer hover:bg-neutral-900/70 transition-colors duration-200 ${
                  column.field === "actions" && !isLoggedIn ? "hidden" : ""
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{column.headerName}</span>

                  <span>
                    {column.sortable && (
                      <SortAscIcon size={18} className="opacity-50" />
                    )}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-neutral-900">
          {data?.map((row, idx) => (
            <tr
              key={row.id}
              className={`${
                idx % 2 === 0 ? "bg-neutral-800" : "bg-neutral-800/60"
              } hover:bg-neutral-900/50 cursor-pointer`}
              onClick={(e) => handleOpenModal(row, "view_accounts", e)}
            >
              {columns.map((column) =>
                column.field === "actions" ? (
                  isLoggedIn && (
                    <td className="px-5 py-4" key={column.field}>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => handleOpenModal(row, "edit", e)}
                          className="text-neutral-500 hover:text-neutral-200"
                        >
                          <Edit size={18} className="opacity-50" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => handleOpenModal(row, "delete", e)}
                          className="text-red-500 hover:text-red-300"
                        >
                          <Trash size={18} className="opacity-50" />
                        </button>
                      </div>
                    </td>
                  )
                ) : (
                  <td key={column.field} className="px-5 py-4">
                    {row[column.field]}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
