import { FormEvent, useState } from "react";
import useModal from "../../../hooks/useModal";
import { BASE_API_URL } from "../../../lib/constants/Index";
import useGlobalStore from "../../../lib/store/GlobalStore";
import { TAccountItem, TAction, TCurrentActionState } from "../../../typings";
import { Modal } from "../../common/modal/Index";
import { Table } from "../../common/table/Index";
import { toastObserver } from "../../common/toast/Index";

const accountItemsTableColumns = [
  { field: "item", nestedField: "id", headerName: "Id", sortable: false },
  { field: "product", nestedField: "name", headerName: "Name", sortable: false },
  { field: "product", nestedField: "productNumber", headerName: "Number", sortable: false },
  { field: "product", nestedField: "color", headerName: "Color", sortable: false },
  { field: "item", nestedField: "quantity", headerName: "Quantity", sortable: false },
  { field: "product", nestedField: "price", headerName: "Price Per Piece", sortable: false },
  { field: "item", nestedField: "totalPrice", headerName: "Total Price", sortable: false },
  { field: "actions", headerName: "Actions" },
];

type DeleteFormProps = {
  accountItem: any;
  handleConfirmModal: (event: FormEvent<HTMLFormElement>) => void;
  cancelModal: () => void;
};

const DeleteForm = ({ accountItem, handleConfirmModal, cancelModal }: DeleteFormProps) => {
  return (
    <>
      <h2 className="text-2xl mb-2 font-semibold">Delete account item</h2>
      <p className="text-lg text-neutral-400">
        Are you sure you want to delete <span className="font-semibold">Item {accountItem.id}</span>?
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

type AccountItemsTableProps = {
  data?: TAccountItem[];
};

export default function AccountItemsTable({ data }: AccountItemsTableProps) {
  // zustand state and actions
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);

  const [currentActionState, setCurrentActionState] = useState<TCurrentActionState>({
    action: null,
    current: null,
  });

  const actionsModalCommands = useModal();

  const handleOpenModal = (current: TAccountItem, action: TAction) => {
    console.log(current, action);
    setCurrentActionState({ action, current });

    switch (action) {
      case "delete":
        actionsModalCommands.openModal();
        break;

      default:
        break;
    }
  };

  const handleDelete = async (item: TAccountItem) => {
    try {
      const res = await fetch(`${BASE_API_URL}/Item/${item.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("Something went wrong");

      toastObserver.notify({
        message: `Item ${item.id} deleted`,
        type: "success",
        show: true,
      });
    } catch (error) {
      console.log(error);

      toastObserver.notify({
        message: `Error while deleting item ${item.id}`,
        type: "error",
        show: true,
      });
    }
  };

  const handleConfirmModal = (e?: FormEvent<HTMLFormElement>) => {
    if (currentActionState.current === null) return;

    switch (currentActionState.action) {
      case "delete":
        handleDelete(currentActionState.current);
        break;

      default:
        break;
    }

    actionsModalCommands.confirmModal();
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <p className="text-lg text-neutral-500">
            Showing <span className="px-1 font-semibold">{data?.length || 0}</span> bill(s)
          </p>
        </div>

        <Table
          isLoggedIn={isLoggedIn}
          data={data}
          columns={accountItemsTableColumns}
          handleOpenModal={handleOpenModal}
          canEdit={false}
        />
      </div>

      {/* Actions Modal */}
      <Modal isOpen={actionsModalCommands.isOpen} closeModal={actionsModalCommands.closeModal}>
        {currentActionState.action === "delete" && (
          <DeleteForm
            accountItem={currentActionState.current}
            handleConfirmModal={handleConfirmModal}
            cancelModal={actionsModalCommands.cancelModal}
          />
        )}
      </Modal>
    </>
  );
}
