import { useDispatch } from "react-redux";
import {
  updateAllowComment,
  updateAllowRecommend,
} from "../../../actions/uploader";

function Checkbox(props) {
  const { desc, name, checked } = props;
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    if (name === "allowComment") {
      dispatch(updateAllowComment(e.target.checked));
    }

    if (name === "allowRecommend") {
      dispatch(updateAllowRecommend(e.target.checked));
    }
  };
  return (
    <div className="flex items-center">
      <input
        onChange={handleInputChange}
        type="checkbox"
        name={name}
        className="relative w-10 min-w-10 h-5 appearance-none outline-none bg-[#c6c6c6] rounded-[20px]
        duration-500 shadow-xl checked:bg-[#03a9f4] before:content-[''] before:absolute before:w-5 before:h-5 before:rounded-[20px] before:top-0 before:left-0 before:bg-white before:scale-110 before:duration-500 before:shadow-xl checked:before:left-5"
        checked={checked}
      />
      <label className="mx-2 text-sm font-medium text-gray-700">{desc}</label>
    </div>
  );
}

export default Checkbox;
