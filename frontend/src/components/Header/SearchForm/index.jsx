import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { createSearch } from "../../../services/searchService";
import ResponseMessage from "../../../config/message";
import Keyword from "./Keyword";
import hideHiddenBoxListener from "../../../utils/hideHiddenBox";
function SearchForm() {
  const navigate = useNavigate();
  const { keyword } = useParams();
  const [showSearchBox, setShowSearchBox] = useState(false);
  const handleOpen = (e) => {
    console.log(showSearchBox);
    setShowSearchBox(true);
  };
  const handleClose = () => {
    setShowSearchBox(false);
  };

  useEffect(() => {
    const searchInput = document.getElementById("search-input");
    if (keyword) {
      searchInput.value = keyword;
    }
  }, [keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    searchInput.blur();
    setShowSearchBox(false);
    if (searchInput.value === "") {
      navigate("/");
      return;
    }
    const result = await createSearch(searchInput.value);
    if (result.message === ResponseMessage.CREATE_SUCCESS) {
      navigate(`/search/${searchInput.value}`);
    }
  };

  hideHiddenBoxListener(
    showSearchBox,
    setShowSearchBox,
    "search-input",
    "search-box",
  );

  return (
    <form
      action=""
      id="search-form"
      className={`relative flex items-center w-6/12 min-w-40 bg-neutral-200 hover:bg-neutral-300 transition ease-in duration-100 rounded-3xl ${showSearchBox && "border-4 border-sky-600 bg-neutral-300"}`}
      onSubmit={handleSubmit}
    >
      {!showSearchBox && (
        <span id="search-icon" className="text-ml py-3.5 px-3 pr-2 font-light">
          <FaSearch />
        </span>
      )}
      <input
        id="search-input"
        type="text"
        placeholder="Tìm kiếm"
        className={`text-lg py-2 px-3 pl-0 grow bg-transparent outline-none ${showSearchBox && "pl-3"}`}
        onFocus={handleOpen}
        autoComplete="off"
      />
      {showSearchBox && (
        <>
          <span
            onClick={handleClose}
            id="close-icon"
            className="hidden lg:block text-xl p-3 rounded-full cursor-pointer"
          >
            <FaTimesCircle />
          </span>
          <div
            id="search-box"
            className=" absolute top-[120%] left-0 right-0 bg-slate-50 shadow-md rounded-xl"
          >
            <Keyword />
          </div>
        </>
      )}
    </form>
  );
}

export default SearchForm;
