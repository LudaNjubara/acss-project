import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNewItemForm } from "../../../hooks/useNewItemForm";
import { TCategory, TProduct, TSubCategory } from "../../../typings";

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

const validateForm = (formData: TNewItemFormData) => {
  const { category, subCategory, product, quantity } = formData;

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
};

type TAddNewItemFormProps = {
  setShowNewItemForm: (showNewItemForm: boolean) => void;
};

export default function AddNewItemForm({ setShowNewItemForm }: TAddNewItemFormProps) {
  const isInitialRender = useRef(true);
  const [formData, setFormData] = useState<TNewItemFormData>({
    category: undefined,
    subCategory: undefined,
    product: undefined,
    quantity: 1,
  });

  const { data, error } = useNewItemForm(formData);

  useEffect(() => {
    if (isInitialRender.current && data) {
      setFormData({
        ...formData,
        category: data.categories[0],
        subCategory: data.subCategories[0],
        product: data.products[0],
      });

      isInitialRender.current = false;
    }
  }, [data, formData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm(formData)) return;

    console.log(formData);
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
            defaultValue={formData.category?.id}
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
              <option key={category.id} value={category.id} selected={formData.category?.id === category.id}>
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
            defaultValue={formData.subCategory?.id}
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
              <option
                key={subCategory.id}
                value={subCategory.id}
                selected={formData.subCategory?.id === subCategory.id}
              >
                {subCategory.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="products" className="text-neutral-200 text-base">
            Products
          </label>
          <select
            name="products"
            id="products"
            defaultValue={formData.product?.id}
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
              <option key={product.id} value={product.id} selected={formData.product?.id === product.id}>
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
