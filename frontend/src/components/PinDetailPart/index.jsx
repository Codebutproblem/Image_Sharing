import { timeAgo } from "../../utils/Time";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPinDetail } from "../../services/pinService";
import ResponseMessage from "../../config/message";
import Heart from "./Heart";
import TopicList from "./TopicList";
import Pin from "./Pin";
function PinDetailPart() {
  const { slug } = useParams();
  const [pin, setPin] = useState({Lover: [], Author: {}, topics: []});
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
    <div className=" mb-14">
      <div className="mb-5">
        <h1 className="text-4xl font-semibold mb-3">{pin.title}</h1>
        <div className="flex items-center justify-between">
          <p className="text-base font-medium">{timeAgo(pin.createdAt)}</p>
          <div className="pr-2">
            <Heart pin={pin} setPin={setPin}/> 
          </div>
        </div>
      </div>
      <div className="mb-5">
        <Pin pin={pin} />
      </div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={pin.Author.avatar || "https://www.gravatar.com/avatar/"}
            alt={pin.Author.username}
            className="w-14 h-14 rounded-full"
          />
          <span className=" text-xl font-semibold">
            {pin.Author.username}
          </span>
        </div>
        <button className="p-3 text-white duration-300 bg-red-500 hover:bg-red-600 rounded-2xl">
          Theo dõi
        </button>
      </div>
      <p className="mb-5 text-lg font-medium">{pin.description}</p>
      <div className="mb-5">
        <TopicList topics={pin.topics} />
      </div>
    </div>
  );
}

export default PinDetailPart;
