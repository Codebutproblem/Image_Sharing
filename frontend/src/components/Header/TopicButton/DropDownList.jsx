import { useEffect, useState } from "react";
import { getAllTopics } from "../../../services/topicService";

function DropDownList({id}){
    const [topics, setTopics] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
          const result = await getAllTopics("name-ASC");
          if (result.message === "get-all-topics-success") {
            result.topics.unshift({ id: 0, name: "Tất cả" });
            setTopics(result.topics);
          }
        };
        fetchApi();
      }, []);
    
      const displayTopics = topics.map((topic) => {
        return (
          <li key={topic.id} className="list-none">
            <a
              href="/"
              className="block p-2 font-semibold hover:bg-neutral-200 rounded-xl"
            >
              {topic.name}
            </a>
          </li>
        );
      });
    return (
        <div
          id={id}
          className="absolute top-full left-0 shadow-lg rounded-2xl bg-slate-50 p-1"
        >
          <ul className="overflow-auto h-80 w-52 max-w-40 p-1">
            {displayTopics}
          </ul>
        </div>
    )
}

export default DropDownList;