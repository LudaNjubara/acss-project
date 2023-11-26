import { X } from "lucide-react";

type TAddNewItemFormProps = {
  setShowNewItemForm: (showNewItemForm: boolean) => void;
};

export default function AddNewItemForm({ setShowNewItemForm }: TAddNewItemFormProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="flex gap-10 pt-5">
      <div>
        <button
          type="button"
          className="rounded-full bg-neutral-700/30 p-5 border-2 border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          onClick={() => setShowNewItemForm(false)}
        >
          <X size={20} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full grid grid-cols-2 gap-10 border-4 border-neutral-700/80 p-5 rounded-md"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="category" className="text-neutral-200 text-base">
            Category
          </label>
          <select
            name="category"
            id="category"
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="category">Category</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
            <option value="category">Category</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="subCategory" className="text-neutral-200 text-base">
            Sub Category
          </label>
          <select
            name="subCategory"
            id="subCategory"
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="category">Sub Category</option>
            <option value="category">Sub Category</option>
            <option value="category">Sub Category</option>
            <option value="category">Sub Category</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="products" className="text-neutral-200 text-base">
            Products
          </label>
          <select
            name="products"
            id="products"
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="category">Products</option>
            <option value="category">Products</option>
            <option value="category">Products</option>
            <option value="category">Products</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quantity" className="text-neutral-200 text-base">
            Quantity
          </label>
          <select
            name="quantity"
            id="quantity"
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="category">Quantity</option>
            <option value="category">Quantity</option>
            <option value="category">Quantity</option>
            <option value="category">Quantity</option>
          </select>
        </div>

        <button
          type="submit"
          className="col-span-2 rounded bg-neutral-900 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}
