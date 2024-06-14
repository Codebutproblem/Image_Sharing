import { useEffect, useState } from "react";
import { ImageList, ImageListItem, Pagination } from "@mui/material";
import SaveButton from "../SaveButton";
import { Link } from "react-router-dom";

function PinTable({ pinObject, page, setPage }) {
  let initColumns = 4;
  if (window.innerWidth < 768) {
    initColumns = 1;
  } else if (window.innerWidth < 1024) {
    initColumns = 2;
  } else if (window.innerWidth < 1280) {
    initColumns = 3;
  }
  const [columns, setColumns] = useState(initColumns);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setColumns(1);
    } else if (window.innerWidth < 1024) {
      setColumns(2);
    } else if (window.innerWidth < 1280) {
      setColumns(3);
    } else {
      setColumns(4);
    }
  };

  const scrollToBottom = () => {
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    if (Math.abs(scrollHeight - clientHeight - scrollTop) < 1) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", scrollToBottom);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", scrollToBottom);
    };
  }, []);

  return (
    <div className="pb-5">
      <ImageList variant="masonry" cols={columns} gap={8}>
        {pinObject.pins.map((pin) => (
          <ImageListItem
            key={pin.id}
            className="group duration-1000 rounded-2xl overflow-hidden"
          >
            <img src={pin.url} alt={pin.title} loading="lazy" />
            <Link
              to={`/pin-detail/${pin.slug}`}
              className="cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000040] hidden group-hover:flex flex-col justify-between p-2.5 font-medium"
            >
              <div className="flex gap-2  justify-between">
                <SaveButton pin={pin} />
                <div className="text-slate-50">{pin?.Lover?.length}❤️</div>
              </div>
              <div className="text-slate-50">
                <div className="mb-1">{pin.title}</div>
                <div className=" hidden sm:flex items-center gap-3">
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
    </div>
  );
}

export default PinTable;
