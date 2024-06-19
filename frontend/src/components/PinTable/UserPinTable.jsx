import { useEffect, useState } from "react";
import { ImageList, ImageListItem, Pagination } from "@mui/material";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { FaPen } from "react-icons/fa";
function UserPinTable({ pinObject }) {
    const navigate = useNavigate();
    const {userObject} = useOutletContext();
    let initColumns = 3;
    if (window.innerWidth < 768) {
        initColumns = 1;
    } else if (window.innerWidth < 1024) {
        initColumns = 2;
    }
    const [columns, setColumns] = useState(initColumns);
    const handleResize = () => {
        if (window.innerWidth < 768) {
            setColumns(1);
        } else if (window.innerWidth < 1024) {
            setColumns(2);
        }
        else {
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
                        className=" rounded-2xl overflow-hidden"
                    >
                        <img src={pin.url} alt={pin.title} loading="lazy" />
                        <div
                            onClick={()=>{navigate(`/pin-detail/${pin.slug}`)}}
                            className="cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000040] flex flex-col justify-between p-3 font-medium"
                        >
                            <div className="flex justify-between items-center">
                                <div className="text-slate-50">❤️{pin?.Lover?.length}</div>
                                {userObject?.isMe && (
                                    <Link to={`/profile/edit-pin/${pin.slug}`} onClick={(e)=>e.stopPropagation()} className=" bg-gray-500 duration-200 hover:bg-gray-600 p-2 rounded-full cursor-pointer">
                                        <FaPen className="text-slate-50" />
                                    </Link>
                                )}
                            </div>
                            <div className="text-slate-50">{pin.title}</div>
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}

export default UserPinTable;
