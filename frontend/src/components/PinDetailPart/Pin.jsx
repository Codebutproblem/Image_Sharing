import { useState } from "react";
import { MdOutlineZoomOutMap } from "react-icons/md";
function Pin({ pin }) {
    const [loaded, setLoaded] = useState(false);
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
            {loaded &&
                <button className="absolute top-5 left-5 px-4 py-3 font-medium text-lg text-white duration-300 bg-orange-500 hover:bg-orange-600 rounded-2xl">
                    Lưu
                </button>
            }
            {loaded &&
                <a
                    href={pin.url}
                    target="_blank"
                    className="absolute top-5 right-5 text-white text-3xl"
                >
                    <MdOutlineZoomOutMap />
                </a>
            }
        </div>
    )
}

export default Pin;