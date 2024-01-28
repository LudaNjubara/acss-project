import { X } from "lucide-react";
import { useState } from "react";
import { useNewItemForm } from "../../../hooks/useNewItemForm";
import { BASE_API_URL } from "../../../lib/constants/Index";
import { TAccount, TCategory, TProduct, TSubCategory } from "../../../typings";
import { toastObserver } from "../../common/toast/Index";

const quantityOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10" },
];

const validateForm = (event: React.FormEvent<HTMLFormElement>) => {
  const formData = new FormData(event.currentTarget);
  const category = formData.get("category");
  const subCategory = formData.get("subCategory");
  const product = formData.get("product");
  const quantity = formData.get("quantity");

  if (!category || !subCategory || !product || !quantity) {
    return false;
  }

  return true;
};

export type TNewItemFormData = {
  category?: TCategory;
  subCategory?: TSubCategory;
  product?: TProduct;
  quantity: number;
  pricePerPiece?: number;
};

type TAddNewItemFormProps = {
  setShowNewItemForm: (showNewItemForm: boolean) => void;
  account: TAccount;
};

export default function AddNewItemForm({ setShowNewItemForm, account }: TAddNewItemFormProps) {
  const [formData, setFormData] = useState<TNewItemFormData>({
    category: undefined,
    subCategory: undefined,
    product: undefined,
    quantity: 1,
    pricePerPiece: undefined,
  });

  const { data, error } = useNewItemForm(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(e)) return;

    const formData = new FormData(e.currentTarget);
    const productId = formData.get("product") as string;
    const quantity = parseInt(formData.get("quantity") as string);
    const pricePerPiece = Math.fround(Math.random() * 100).toFixed(2);

    try {
      const res = await fetch(`${BASE_API_URL}/Item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          billId: account.bill.id,
          productId: parseInt(productId),
          quantity,
          pricePerPiece,
          totalPrice: (quantity * parseFloat(pricePerPiece)).toFixed(2),
        }),
      });

      if (!res.ok) throw new Error("There was an error adding the item. Please try again.");

      toastObserver.notify({
        type: "success",
        message: "Item added successfully.",
        show: true,
      });

      setShowNewItemForm(false);
    } catch (error) {
      console.log(error);

      const errorMessage =
        error instanceof Error ? error.message : "There was an error adding the item. Please try again.";

      toastObserver.notify({
        type: "error",
        message: errorMessage,
        show: true,
      });
    }
  };

  return (
    <div className="flex gap-10">
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
            value={formData.category?.id || data?.categories[1].id}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: data?.categories.find((category) => category.id === parseInt(e.target.value)),
              })
            }
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="" disabled>
              Select a category
            </option>

            {data?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="subCategory" className="text-neutral-200 text-base">
            Sub Category
          </label>
          <select
            name="subCategory"
            id="subCategory"
            value={formData.subCategory?.id || data?.subCategories[0].id}
            onChange={(e) =>
              setFormData({
                ...formData,
                subCategory: data?.subCategories.find(
                  (subCategory) => subCategory.id === parseInt(e.target.value)
                ),
              })
            }
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="" disabled>
              Select a sub category
            </option>

            {data?.subCategories.map((subCategory) => (
              <option key={subCategory.id} value={subCategory.id}>
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="product" className="text-neutral-200 text-base">
            Products
          </label>
          <select
            name="product"
            id="product"
            value={formData.product?.id || data?.products[0].id}
            onChange={(e) =>
              setFormData({
                ...formData,
                product: data?.products.find((product) => product.id === parseInt(e.target.value)),
              })
            }
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            <option value="" disabled>
              Select a product
            </option>

            {data?.products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="quantity" className="text-neutral-200 text-base">
            Quantity
          </label>
          <select
            name="quantity"
            id="quantity"
            defaultValue={formData.quantity || 1}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
            className="rounded bg-neutral-900/80 text-neutral-100 px-4 py-2 border-2 font-bold border-neutral-500/30 shadow-md hover:brightness-125 transition duration-200 ease-in-out"
          >
            {quantityOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
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
