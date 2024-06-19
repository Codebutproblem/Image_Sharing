import { IoHeartOutline } from "react-icons/io5";
import { IoHeartSharp } from "react-icons/io5";
import { setLovePin } from "../../../services/pinService";
import ResponseMessage from "../../../config/message";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoverList from "./LoverList";
function Heart({ pin, setPin }) {
  const user = useSelector((state) => state.UserReducer);
  const [showLoverList, setShowLoverList] = useState(false);
  const handleLove = async () => {
    const result = await setLovePin(pin.id);
    if (result.message === ResponseMessage.UPDATE_SUCCESS) {
      if (pin.Lover.find((lover) => lover.id === user.id)) {
        setPin({
          ...pin,
          Lover: pin.Lover.filter((lover) => lover.id !== user.id),
        });
      } else {
        setPin({
          ...pin,
          Lover: [
            ...pin.Lover,
            {
              id: user.id,
              username: user.username,
              avatar: user.avatar,
              slug: user.slug,
            },
          ],
        });
      }
    }
  };

  const handleShowLover = () => {
    setShowLoverList(true);
  };

  return (
    <div className="flex items-center gap-2 text-lg">
      <span
        onClick={handleShowLover}
        className="px-2 py-1 bg-gray-500 text-slate-50 text-sm rounded-lg cursor-pointer"
      >
        {pin.Lover.length}
      </span>
      {pin.Lover.find((lover) => lover.id === user.id) ? (
        <IoHeartSharp
          onClick={handleLove}
          className=" text-4xl text-red-600 cursor-pointer"
        />
      ) : (
        <IoHeartOutline
          onClick={handleLove}
          className=" text-4xl cursor-pointer"
        />
      )}
      {showLoverList && (
        <LoverList lovers={pin.Lover} setShowLoverList={setShowLoverList} />
      )}
    </div>
  );
}
export default Heart;
