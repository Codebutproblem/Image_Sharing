import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";

function HomeButton({ showText }) {
  return (
    <Link
      to={"/"}
      className="text-lg whitespace-nowrap p-3.5 sm:p-3 font-medium bg-sky-600 hover:bg-sky-700 rounded-3xl text-slate-50"
    >
      {showText ? "Trang chủ" : <IoMdHome />}
    </Link>
  );
}

export default HomeButton;
