import { useEffect, useState } from "react";
import { ImageList, ImageListItem } from "@mui/material";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
function TableList({ tableObject }) {
  const navigate = useNavigate();
  const { slug } = useParams();
  let initColumns = 2;
  if (window.innerWidth < 768) {
    initColumns = 1;
  }
  const [columns, setColumns] = useState(initColumns);
  const handleResize = () => {
    if (window.innerWidth < 768) {
      setColumns(1);
    } else {
      setColumns(2);
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
      <ImageList variant="standard" cols={columns} gap={9}>
        {tableObject.tables.map((table) => (
          <ImageListItem
            key={table.id}
            className=" rounded-2xl overflow-hidden"
          >
            <img
              src={table?.frontPin?.url || "/images/gray.jpg"}
              alt={table.name}
              loading="lazy"
            />
            <div
              onClick={() => navigate(`/profile/${slug}/table/${table.slug}`)}
              className="group cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000060] flex flex-col justify-between p-3 font-medium"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-2xl duration-300 group-hover:scale-110">
                {table.name}
              </div>
            </div>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default TableList;
