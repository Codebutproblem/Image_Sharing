import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
function AddButton() {
  return (
    <Link
      to={"/upload"}
      className="text-lg p-3.5 rounded-full shadow-xl border-solid border-2 bg-slate-50 border-slate-300 font-medium hover:bg-slate-200  transition ease-in duration-400"
    >
      <IoMdAdd />
    </Link>
  );
}

export default AddButton;
