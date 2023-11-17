import { Search } from "lucide-react";
import { memo } from "react";
import { BASE_API_URL } from "../../../lib/constants/Index";
import { TCustomer } from "../../../typings";

type TCustomersSearchProps = {
  setCustomersData: (customers: TCustomer[]) => void;
  setResponseError: (message: string) => void;
};

function CustomersSearch({ setCustomersData, setResponseError }: TCustomersSearchProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery") as string;

    if (!searchQuery) return;

    try {
      const res = await fetch(`${BASE_API_URL}/Customer`, {
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchQuery }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        setResponseError(message || "Something went wrong");
      }

      const { data } = await res.json();
      setCustomersData(data);
    } catch (error) {
      if (error instanceof Error) {
        setResponseError(error.message);
      } else {
        setResponseError("Something went wrong");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 overflow-hidden">
      <input
        type="text"
        name="searchQuery"
        className="px-5 py-4 flex-grow bg-neutral-800 rounded-xl border-2 border-neutral-400/30 placeholder:text-neutral-500 placeholder:font-normal outline-none focus:border-neutral-200/30 focus:bg-neutral-900 transition-colors duration-300"
        placeholder="Search customers..."
      />
      <button
        type="submit"
        className="grid place-items-center aspect-square w-14 rounded-xl text-neutral-800 bg-neutral-900 hover:bg-neutral-900/60 focus:bg-neutral-900/8hover:bg-neutral-900/60 transition-colors duration-300"
      >
        <Search size={24} className="opacity-70" />
      </button>
    </form>
  );
}

export default memo(CustomersSearch);
