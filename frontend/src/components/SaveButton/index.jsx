import { useDispatch, useSelector } from "react-redux";
import { setSaveBox } from "../../redux/actions/other";

function SaveButton({ pin }) {
  const user = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const handleSave = (e) => {
    e.preventDefault();
    dispatch(setSaveBox({show: true, pinId: pin.id}));
  };
  if (pin.Tables && pin.Tables.find((table) => table.user_id === user.id)){
    return (
      <button className=" text-xs sm:text-base p-2 bg-gray-500 rounded-xl text-slate-50 cursor-not-allowed">
        Đã lưu
      </button>
    );
  };
  return (
    <div>
      <button onClick={handleSave} className="text-xs sm:text-base p-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-slate-50">
        Lưu
      </button>
    </div>

  );
}
export default SaveButton;
