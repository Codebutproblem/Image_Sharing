import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaTimesCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { createSearch } from "../../../services/searchService";
import ResponseMessage from "../../../config/message";
import Keyword from "./Keyword";
function SearchForm() {
  const navigate = useNavigate();
  const {keyword} = useParams();
  const [showSearchBox, setShowSearchBox] = useState(false);
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
    setShowSearchBox(!showSearchBox);
  };

  useEffect(() => {
    const searchInput = document.getElementById("search-input");
    if(keyword){
      searchInput.value = keyword;
    }
  }, [keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchInput = document.getElementById("search-input");
    if(searchInput.value === ""){
      return;
    };
    const result = await createSearch(searchInput.value);
    if(result.message === ResponseMessage.CREATE_SUCCESS){
      navigate(`/search/${searchInput.value}`);
    }
    
  };

  return (
    <form
      action=""
      id="search-form"
      className="relative flex items-center w-6/12 min-w-40 bg-neutral-200 hover:bg-neutral-300 transition ease-in duration-100 rounded-3xl"
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
        autoComplete="off"
      />
      <span
        onClick={handleInput}
        id="close-icon"
        className="hidden text-xl p-3 rounded-full cursor-pointer"
      >
        <FaTimesCircle />
      </span>
      {showSearchBox &&
        <div className=" absolute top-[120%] left-0 right-0 bg-slate-50 shadow-md rounded-xl">
          <div className="p-3">
            <Keyword/>
          </div>
        </div>
      }

    </form>
  );
}

export default SearchForm;
