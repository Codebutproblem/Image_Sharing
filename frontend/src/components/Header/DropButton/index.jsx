import { FaAngleDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import DropBox from "./DropBox";
import hideHiddenBoxListener from "../../../utils/hideHiddenBox";

function DropButton() {
  const [showSettingBox, setShowSettingBox] = useState(false);

  hideHiddenBoxListener(
    showSettingBox,
    setShowSettingBox,
    "dropButton",
    "settingBox",
  );

  return (
    <div className="relative">
      <button
        id="dropButton"
        onClick={() => setShowSettingBox(!showSettingBox)}
        className="text-2xl p-1 rounded-full hover:bg-neutral-300 mx-1 cursor-pointer"
      >
        <FaAngleDown />
      </button>
      {showSettingBox && <DropBox id={"settingBox"} />}
    </div>
  );
}

export default DropButton;
