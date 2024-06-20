import { useEffect, useState } from "react";
import { deleteSearch, getSearchs } from "../../../services/searchService";
import ResponseMessage from "../../../config/message";
import { Link } from "react-router-dom";
import { TiDelete } from "react-icons/ti";

function Keyword() {
  const [keywords, setKeywords] = useState([]);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getSearchs(7);
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setKeywords(result.searchs);
      }
    };
    waittingAPI();
  }, [reload]);

  return (
    <>
      {keywords.length > 0 && (
        <div className="p-3">
          <div className=" text-sm font-medium mb-2">Trước đó</div>
          <div className="flex gap-2 flex-wrap">
            {keywords.map((keyword) => (
              <div
                key={keyword.id}
                className="mb-2 bg-gray-500 p-2 text-sm text-slate-50 rounded-xl flex items-center"
              >
                <Link to={`/search/${keyword.keyword}`} className="px-1">
                  {keyword.keyword}
                </Link>
                <span
                  onClick={async () => {
                    const result = await deleteSearch(keyword.id);
                    if (result.message === ResponseMessage.DELETE_SUCCESS) {
                      setReload(reload + 1);
                    }
                  }}
                >
                  <TiDelete className="text-xl cursor-pointer" />
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Keyword;
