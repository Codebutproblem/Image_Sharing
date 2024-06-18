import { useEffect, useState } from "react";
import { ImageList, ImageListItem, Pagination } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function PinTable({ pinObject, page, setPage }) {
  const navigate = useNavigate();
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
      <ImageList variant="standard" cols={columns} gap={8}>
        {pinObject.pins.map((pin) => (
          <ImageListItem
            key={pin.id}
            className="group duration-1000 rounded-2xl overflow-hidden"
          >
            <img src={pin.url} alt={pin.title} loading="lazy" />
            <div
              onClick={()=>{navigate(`/pin-detail/${pin.slug}`)}}
              className="cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000040] hidden group-hover:flex flex-col justify-between p-3 font-medium"
            >
              <div className="text-slate-50">❤️{pin?.Lover?.length}</div>
              <div className="text-slate-50">
                <div className="mb-1.5">{pin.title}</div>
                <div className=" hidden sm:flex items-center gap-3">
                  <Link
                    onClick={(e)=> e.stopPropagation()}
                    to={`/profile/${pin.Author.slug}`}
                  >
                    <img
                      src={
                        pin.Author.avatar ||
                        "https://www.gravatar.com/avatar/"
                      }
                      alt={pin.Author.username}
                      className="w-10 max-w-10 h-10 rounded-full object-cover"
                    />
                  </Link>
                  <Link className=" hover:underline" onClick={(e)=> e.stopPropagation()} to={`/profile/${pin.Author.slug}`}>{pin.Author.username}</Link>
                </div>
              </div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default PinTable;
