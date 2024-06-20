import { ImageList, ImageListItem } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

function SavedPin({ pinObject }) {
  const navigate = useNavigate();
  const user = useSelector((state) => state.UserReducer);
  let initColumns = 3;
  if (window.innerWidth < 480) {
    initColumns = 1;
  } else if (window.innerWidth < 640) {
    initColumns = 2;
  } else if (window.innerWidth < 768) {
    initColumns = 3;
  } else if (window.innerWidth < 1024) {
    initColumns = 2;
  }
  const [columns, setColumns] = useState(initColumns);
  const handleResize = () => {
    if (window.innerWidth < 480) {
      setColumns(1);
    } else if (window.innerWidth < 640) {
      setColumns(2);
    } else if (window.innerWidth < 768) {
      setColumns(3);
    } else if (window.innerWidth < 1024) {
      setColumns(2);
    } else {
      setColumns(3);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="pb-5">
      <ImageList variant="standard" cols={columns} gap={8}>
        {pinObject.pins.map((pin) => (
          <ImageListItem
            key={pin.id}
            className="group duration-1000 rounded-2xl overflow-hidden"
          >
            <img src={pin.url} alt={pin.title} loading="lazy" />
            <div
              onClick={() => {
                navigate(`/pin-detail/${pin.slug}`);
              }}
              className="cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000040] hidden group-hover:flex flex-col justify-between p-3 font-medium"
            >
              <div className="flex justify-between items-center">
                <div className="text-slate-50">❤️{pin?.Lover?.length}</div>
                {pin?.Tables.find((table) => table.user_id === user?.id) && (
                  <span className=" text-xs sm:text-base p-2 bg-gray-500 rounded-xl text-slate-50">
                    Đã lưu
                  </span>
                )}
              </div>
              <div className="text-slate-50">
                <div className="mb-1.5">{pin.title}</div>
                <div className=" hidden sm:flex items-center gap-3">
                  <Link
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${pin.Author.slug}`}
                  >
                    <img
                      src={
                        pin.Author.avatar || "https://www.gravatar.com/avatar/"
                      }
                      alt={pin.Author.username}
                      className="w-10 max-w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <Link
                    className=" hover:underline"
                    onClick={(e) => e.stopPropagation()}
                    to={`/profile/${pin.Author.slug}`}
                  >
                    {pin.Author.username}
                  </Link>
                </div>
              </div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default SavedPin;
