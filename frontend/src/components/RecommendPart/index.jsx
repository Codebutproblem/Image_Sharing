import { useEffect, useState } from "react";
import ResponseMessage from "../../config/message";
import { getRecommendPins } from "../../services/pinService";
import { ImageList, ImageListItem } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import SaveButton from "../SaveButton";
function RecommendPart({ limit }) {
  const [pins, setPins] = useState([]);
  const { slug } = useParams();
  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getRecommendPins({ slug, limit });
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setPins(result.pins);
      }
    };
    waittingAPI();
  }, [slug]);
  return (
    <>
      <h1 className="text-3xl font-semibold mb-5">Liên quan</h1>
      <ImageList variant="standard" cols={1} gap={10}>
        {pins.map((pin) => (
          <ImageListItem
            key={pin.id}
            className="duration-1000 rounded-2xl overflow-hidden"
          >
            <img src={pin.url} alt={pin.title} loading="lazy" />
            <Link
              to={`/pin-detail/${pin.slug}`}
              className="cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000040] flex flex-col justify-between p-2.5 font-medium"
            >
              <div className="flex gap-2  justify-between">
                <SaveButton pinId={pin.id} />
                <div className="text-slate-50">{pin.Lover.length}❤️</div>
              </div>
              <div className="text-slate-50">
                <div className="mb-1">{pin.title}</div>
                <div className="flex items-center gap-3">
                  <img
                    src={
                      pin.Author.avatar ||
                      "https://www.gravatar.com/avatar/"
                    }
                    alt={pin.Author.username}
                    className="w-10 max-w-10 h-10 rounded-full object-cover"
                  />
                  <div>{pin.Author.username}</div>
                </div>
              </div>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}
export default RecommendPart;
