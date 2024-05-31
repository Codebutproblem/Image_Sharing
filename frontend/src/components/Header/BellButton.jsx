import { FaBell } from "react-icons/fa6";

function BellButton() {
  return (
    <button className="text-2xl p-3 rounded-full hover:bg-neutral-300 mx-1 cursor-pointer">
      <FaBell />
    </button>
  );
}

export default BellButton;
