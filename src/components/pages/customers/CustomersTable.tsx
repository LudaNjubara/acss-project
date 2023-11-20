import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { BASE_API_URL } from "../../../lib/constants/Index";
import useGlobalStore from "../../../lib/store/GlobalStore";
import { TAction, TCurrentActionState, TCustomer } from "../../../typings";
import { toastObserver } from "../../common/toast/Index";

const numOfCustomersToShowDropdownOptions = [10, 25, 50, 100];

type TCustomersTableProps = {
  data?: TCustomer[];
};

export default function CustomersTable({ data }: TCustomersTableProps) {
  // zustand state and actions
  const numOfCustomersToShow = useGlobalStore((state) => state.numOfCustomersToShow);
  const setNumOfCustomersToShow = useGlobalStore((state) => state.setNumOfCustomersToShow);

  const [currentActionState, setCurrentActionState] = useState<TCurrentActionState>({
    action: null,
    customer: null,
  });

  const { isOpen, openModal, closeModal, isOk, confirmModal, isCancel, cancelModal } = useModal();

  const handleOpenModal = (customer: TCustomer, action: TAction) => {
    setCurrentActionState({ action, customer });
    openModal();
  };

  const handleEdit = async (customer: TCustomer) => {
    try {
      const res = await fetch(`${BASE_API_URL}/Customer/${customer.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(customer),
      });

      if (!res.ok) throw new Error("Something went wrong");

      toastObserver.notify({
        message: `Customer ${customer.name} ${customer.surname} updated`,
        type: "success",
        show: true,
      });
    } catch (error) {
      console.log(error);

      toastObserver.notify({
        message: `Error while updating customer ${customer.name} ${customer.surname}`,
        type: "error",
        show: true,
      });
    }
  };

  const handleDelete = async (customer: TCustomer) => {
    try {
      const res = await fetch(`${BASE_API_URL}/Customer/${customer.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Something went wrong");

      toastObserver.notify({
        message: `Customer ${customer.name} ${customer.surname} deleted`,
        type: "success",
        show: true,
      });
    } catch (error) {
      console.log(error);

      toastObserver.notify({
        message: `Error while deleting customer ${customer.name} ${customer.surname}`,
        type: "error",
        show: true,
      });
    }
  };

  const handleConfirmModal = (e?: React.FormEvent<HTMLFormElement>) => {
    if (currentActionState.customer === null) return;

    switch (currentActionState.action) {
      case "edit":
        if (!e) return;
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const name = formData.get("name") as string;
        const surname = formData.get("surname") as string;
        const email = formData.get("email") as string;
        const telephone = formData.get("telephone") as string;

        const newCustomer = {
          ...currentActionState.customer,
          name,
          surname,
          email,
          telephone,
        };
        handleEdit(newCustomer);
        break;

      case "delete":
        handleDelete(currentActionState.customer);
        break;

      default:
        break;
    }

    confirmModal();
  };

  return (
    <>
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
                <th className="px-5 py-4 font-semibold text-neutral-500 uppercase bg-neutral-900">
                  Telephone
                </th>
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
                        onClick={() => handleOpenModal(customer, "edit")}
                        className="text-neutral-500 hover:text-neutral-200"
                      >
                        <Edit size={18} className="opacity-50" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenModal(customer, "delete")}
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

      {/* Actions modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-neutral-900/80">
          <div className="w-full max-w-md bg-neutral-800 rounded-lg p-8">
            {/* Edit modal */}
            {currentActionState.action === "edit" && (
              <>
                <h2 className="text-2xl mb-2 font-semibold">Edit customer</h2>
                <p className="text-lg text-neutral-500">
                  Editing{" "}
                  <span className="font-semibold">
                    {currentActionState.customer?.name} {currentActionState.customer?.surname}
                  </span>
                </p>

                <form onSubmit={handleConfirmModal} className="flex flex-col gap-3 mt-5">
                  <label htmlFor="name" className="text-lg text-neutral-500">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={currentActionState.customer?.name}
                    className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
                  />

                  <label htmlFor="surname" className="text-lg text-neutral-500">
                    Surname
                  </label>
                  <input
                    type="text"
                    name="surname"
                    id="surname"
                    defaultValue={currentActionState.customer?.surname}
                    className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
                  />

                  <label htmlFor="email" className="text-lg text-neutral-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={currentActionState.customer?.email}
                    className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
                  />

                  <label htmlFor="telephone" className="text-lg text-neutral-500">
                    Telephone
                  </label>
                  <input
                    type="tel"
                    name="telephone"
                    id="telephone"
                    defaultValue={currentActionState.customer?.telephone}
                    className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
                  />

                  <div className="flex items-center justify-end gap-3 mt-5">
                    <button
                      type="button"
                      onClick={() => cancelModal()}
                      className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-md bg-green-600 text-neutral-50 hover:bg-green-500"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </>
            )}

            {/* Delete modal */}
            {currentActionState.action === "delete" && (
              <>
                <h2 className="text-2xl mb-2 font-semibold">Delete customer</h2>
                <p className="text-lg text-neutral-400">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">
                    {currentActionState.customer?.name} {currentActionState.customer?.surname}{" "}
                  </span>
                  ?
                </p>

                <form onSubmit={handleConfirmModal} className="flex items-center justify-end gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() => cancelModal()}
                    className="px-4 py-2 rounded-md bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-md bg-red-600 text-neutral-50 hover:bg-red-500"
                  >
                    Delete
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
