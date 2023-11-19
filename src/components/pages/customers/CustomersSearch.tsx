import { Search } from "lucide-react";
import { memo } from "react";

type TCustomersSearchProps = {
  setSearchQuery: (query: string) => void;
};

function CustomersSearch({ setSearchQuery }: TCustomersSearchProps) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery") as string;

    setSearchQuery(searchQuery);
  };

  const handleClearSearch = () => {
    const searchInput = document.querySelector<HTMLInputElement>("input[name=searchQuery]");
    if (searchInput && searchInput.value) {
      console.log("clearing search");
      searchInput.value = "";
    }

    setSearchQuery("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="overflow-hidden">
        <div className="flex items-center gap-2">
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
        </div>

        <button
          type="button"
          className="px-2 py-1 inline-flex w-fit rounded-md mt-2 text-sm tracking-wide bg-neutral-900/30  hover:bg-neutral-900/60 focus:bg-neutral-900/30  transition-colors duration-300"
          onClick={handleClearSearch}
        >
          Clear search
        </button>
      </form>
    </>
  );
}

export default memo(CustomersSearch);
