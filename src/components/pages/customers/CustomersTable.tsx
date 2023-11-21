import { useState } from "react";
import useModal from "../../../hooks/useModal";
import { BASE_API_URL, NUM_OF_CUSTOMERS_TO_SHOW_DROPDOWN_OPTIONS } from "../../../lib/constants/Index";
import useGlobalStore from "../../../lib/store/GlobalStore";
import { TAction, TCurrentActionState, TCustomer, TCustomerColumn, TCustomerKey } from "../../../typings";
import { Modal } from "../../common/modal/Index";
import { Table } from "../../common/table/Index";
import { toastObserver } from "../../common/toast/Index";

const customerColumns: TCustomerColumn[] = [
  { field: "name", headerName: "Name", sortable: true },
  { field: "surname", headerName: "Surname", sortable: true },
  { field: "email", headerName: "Email", sortable: true },
  { field: "telephone", headerName: "Telephone", sortable: true },
  { field: "actions", headerName: "Actions" },
];

type EditFormProps = {
  customer: any;
  handleConfirmModal: (event: React.FormEvent<HTMLFormElement>) => void;
  cancelModal: () => void;
};

const EditForm = ({ customer, handleConfirmModal, cancelModal }: EditFormProps) => {
  return (
    <>
      <h2 className="text-2xl mb-2 font-semibold">Edit customer</h2>
      <p className="text-lg text-neutral-500">
        Editing{" "}
        <span className="font-semibold">
          {customer?.name} {customer?.surname}
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
          defaultValue={customer?.name}
          className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
        />

        <label htmlFor="surname" className="text-lg text-neutral-500">
          Surname
        </label>
        <input
          type="text"
          name="surname"
          id="surname"
          defaultValue={customer?.surname}
          className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
        />

        <label htmlFor="email" className="text-lg text-neutral-500">
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          defaultValue={customer?.email}
          className="px-2 py-1 rounded-md bg-neutral-800 border-2 border-neutral-400/30 text-lg text-neutral-500"
        />

        <label htmlFor="telephone" className="text-lg text-neutral-500">
          Telephone
        </label>
        <input
          type="tel"
          name="telephone"
          id="telephone"
          defaultValue={customer?.telephone}
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
  );
};

type DeleteFormProps = {
  customer: any;
  handleConfirmModal: (event: React.FormEvent<HTMLFormElement>) => void;
  cancelModal: () => void;
};

const DeleteForm = ({ customer, handleConfirmModal, cancelModal }: DeleteFormProps) => {
  return (
    <>
      <h2 className="text-2xl mb-2 font-semibold">Delete customer</h2>
      <p className="text-lg text-neutral-400">
        Are you sure you want to delete{" "}
        <span className="font-semibold">
          {customer?.name} {customer?.surname}{" "}
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
        <button type="submit" className="px-4 py-2 rounded-md bg-red-600 text-neutral-50 hover:bg-red-500">
          Delete
        </button>
      </form>
    </>
  );
};

type TCustomersTableProps = {
  data?: TCustomer[];
};

export default function CustomersTable({ data }: TCustomersTableProps) {
  // zustand state and actions
  const numOfCustomersToShow = useGlobalStore((state) => state.numOfCustomersToShow);
  const setNumOfCustomersToShow = useGlobalStore((state) => state.setNumOfCustomersToShow);
  const sort = useGlobalStore((state) => state.sort);
  const setSort = useGlobalStore((state) => state.setSort);
  const order = useGlobalStore((state) => state.order);
  const setOrder = useGlobalStore((state) => state.setOrder);

  const [currentActionState, setCurrentActionState] = useState<TCurrentActionState>({
    action: null,
    customer: null,
  });

  const handleSort = (field: TCustomerKey) => {
    if (sort.includes(field)) {
      const newOrder = [...order];
      const index = sort.indexOf(field);
      newOrder[index] = order[index] === "asc" ? "desc" : "asc";
      setOrder(newOrder);
    } else {
      setSort([...sort, field]);
      setOrder([...order, "asc"]);
    }
  };

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
              {NUM_OF_CUSTOMERS_TO_SHOW_DROPDOWN_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-lg text-neutral-500">customers per page</span>
          </div>
        </div>

        <Table data={data} columns={customerColumns} handleOpenModal={handleOpenModal} onSort={handleSort} />
      </div>

      {/* Actions modal */}
      {isOpen && (
        <Modal isOpen={isOpen}>
          {currentActionState.action === "edit" && (
            <EditForm
              customer={currentActionState.customer}
              handleConfirmModal={handleConfirmModal}
              cancelModal={cancelModal}
            />
          )}
          {currentActionState.action === "delete" && (
            <DeleteForm
              customer={currentActionState.customer}
              handleConfirmModal={handleConfirmModal}
              cancelModal={cancelModal}
            />
          )}
        </Modal>
      )}
    </>
  );
}
