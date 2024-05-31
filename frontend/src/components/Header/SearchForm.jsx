import { FaSearch } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
function SearchForm() {
  const handleInput = (e) => {
    const searchIcon = document.getElementById("search-icon");
    const searchInput = document.getElementById("search-input");
    const searchForm = document.getElementById("search-form");
    const closeIcon = document.getElementById("close-icon");
    searchIcon.classList.toggle("hidden");
    searchInput.classList.toggle("pl-3");
    searchForm.classList.toggle("border-4");
    searchForm.classList.toggle("border-sky-600");
    searchForm.classList.toggle("bg-neutral-300");
    closeIcon.classList.toggle("hidden");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form
      action=""
      id="search-form"
      className="flex items-center w-6/12 min-w-96 bg-neutral-200 hover:bg-neutral-300 transition ease-in duration-100 rounded-3xl overflow-hidden"
      onSubmit={handleSubmit}
    >
      <span id="search-icon" className="text-ml py-3.5 px-3 pr-2 font-light">
        <FaSearch />
      </span>
      <input
        id="search-input"
        type="text"
        placeholder="Tìm kiếm"
        className="text-lg py-2 px-3 pl-0 grow bg-transparent outline-none"
        onFocus={handleInput}
        onBlur={handleInput}
        autoComplete="off"
      />
      <span
        id="close-icon"
        className="hidden text-xl p-3 rounded-full cursor-pointer"
      >
        <FaTimesCircle />
      </span>
    </form>
  );
}

export default SearchForm;
