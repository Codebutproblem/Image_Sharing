import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <Link
      to={"/"}
      className="text-lg whitespace-nowrap p-3 font-medium bg-sky-600 hover:bg-sky-700 rounded-3xl text-slate-50"
    >
      Trang chủ
    </Link>
  );
}

export default HomeButton;
