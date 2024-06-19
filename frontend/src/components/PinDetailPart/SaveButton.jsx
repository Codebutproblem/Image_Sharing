import { useDispatch, useSelector } from "react-redux";
import SavePinBox from "./SavePinBox";
import { useState } from "react";
import { unSavePin } from "../../services/pinService";
import ResponseMessage from "../../config/message";

function SaveButton({ pin }) {
  const user = useSelector((state) => state.UserReducer);
  const [saved, setSaved] = useState(false);
  const [showSaveBox, setShowSaveBox] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    setShowSaveBox(true);
  };
  const handleUnSave = async (e) => {
    e.preventDefault();
    const result = await unSavePin(pin.id);
    if (result.message === ResponseMessage.UPDATE_SUCCESS) {
      pin.Tables = pin.Tables.filter((table) => table.user_id !== user.id);
      setSaved(false);
    }
  };
  if (
    (pin.Tables && pin.Tables.find((table) => table.user_id === user.id)) ||
    saved
  ) {
    return (
      <button
        onClick={handleUnSave}
        className=" text-xs sm:text-base p-2 bg-gray-500 rounded-xl text-slate-50"
      >
        Đã lưu
      </button>
    );
  }
  return (
    <div>
      <button
        onClick={handleSave}
        className="text-xs sm:text-base p-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-slate-50"
      >
        Lưu
      </button>
      {showSaveBox && (
        <SavePinBox
          setShowSaveBox={setShowSaveBox}
          setSaved={setSaved}
          pinId={pin.id}
        />
      )}
    </div>
  );
}
export default SaveButton;
