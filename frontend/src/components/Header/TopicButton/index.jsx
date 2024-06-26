import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import hideHiddenBoxListener from "../../../utils/hideHiddenBox";
import DropDownList from "./DropDownList";
function TopicButton({ showText }) {
  const [showTopics, setShowTopics] = useState(false);
  hideHiddenBoxListener(
    showTopics,
    setShowTopics,
    "topicButton",
    "topicDropDown",
  );

  return (
    <div className="relative">
      <button
        id="topicButton"
        onClick={() => setShowTopics(!showTopics)}
        className="text-lg whitespace-nowrap p-3.5 sm:p-3 font-medium bg-orange-400 hover:bg-orange-500 rounded-3xl text-slate-50 flex items-center gap-2"
      >
        {showText && <span>Chủ đề</span>}
        <FaAngleDown />
      </button>
      {showTopics && (
        <DropDownList id="topicDropDown" setShowTopics={setShowTopics} />
      )}
    </div>
  );
}

export default TopicButton;
