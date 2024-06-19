import { useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useSelector } from "react-redux";
import SaveButton from "./SaveButton";
function Pin({ pin }) {
  const [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.UserReducer);
  const handleOnLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="relative min-h-28">
      <img
        onLoad={handleOnLoad}
        loading="lazy"
        src={pin.url}
        alt={pin.title}
        className="w-full rounded-2xl"
      />
      {loaded && (
        <div className="absolute top-3 left-3 sm:top-5 sm:left-5">
          <SaveButton pin={pin} />
        </div>
      )}
      {loaded && (
        <a
          href={pin.url}
          target="_blank"
          className="absolute top-3 right-3 sm:top-5 sm:right-5 text-white text-xl sm:text-3xl"
        >
          <MdOutlineZoomOutMap />
        </a>
      )}
    </div>
  );
}

export default Pin;
