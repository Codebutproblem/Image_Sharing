import { timeAgo } from "../../utils/Time";
import { getContrastingTextColor } from "../../utils/Color";
import { MdOutlineZoomOutMap } from "react-icons/md";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPinDetail } from "../../services/pinService";
import { ResponseMessage } from "../../config/system";
function PinDetailPart() {
  const { slug } = useParams();
  const [pin, setPin] = useState({});
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getPinDetail(slug);
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setPin(result.pin);
      }
    };
    waittingAPI();
  }, [slug]);
  return (
    <>
      <div className="mb-5">
        <div className="flex items-center gap-5 mb-3">
          <h1 className="text-4xl font-semibold">{pin.title}</h1>
        </div>
        <p className="text-base font-medium">{timeAgo(pin.createdAt)}</p>
      </div>
      <div className="relative mb-5">
        <img
          loading="lazy"
          src={pin.url}
          alt={pin.title}
          className="w-full rounded-2xl"
        />
        <button className="absolute top-5 left-5 px-4 py-3 font-medium text-lg text-white duration-300 bg-orange-500 hover:bg-orange-600 rounded-2xl">
          Lưu
        </button>
        <a
          href={pin.url}
          target="_blank"
          className="absolute top-5 right-5 text-white text-3xl"
        >
          <MdOutlineZoomOutMap />
        </a>
      </div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={pin?.UserAccount?.avatar || "https://www.gravatar.com/avatar/"}
            alt={pin?.UserAccount?.username}
            className="w-14 h-14 rounded-full"
          />
          <span className=" text-xl font-semibold">
            {pin?.UserAccount?.username}
          </span>
        </div>
        <button className="p-3 text-white duration-300 bg-red-500 hover:bg-red-600 rounded-2xl">
          Theo dõi
        </button>
      </div>
      <p className="mb-5 text-lg font-medium">{pin.description}</p>
      <div className="mb-5 flex  flex-wrap gap-3">
        {pin.topics?.map((topic) => (
          <span
            style={{
              backgroundColor: `${topic.hexa_color}`,
              color: getContrastingTextColor(topic.hexa_color),
            }}
            key={topic.id}
            className="p-2 rounded-xl"
          >
            {topic.name}
          </span>
        ))}
      </div>
    </>
  );
}

export default PinDetailPart;
