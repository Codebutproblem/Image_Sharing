import { useEffect, useState } from "react";
import { getPins } from "../../services/pinService";
import { ImageList, ImageListItem } from "@mui/material";
import SaveButton from "../SaveButton";
function PinTable() {

    const [pins, setPins] = useState([]);
    const [columns, setColumns] = useState(4);


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

    useEffect(() => {
        const waittingAPI = async () => {
            const result = await getPins();
            if (result.message === "get-pins-success") {
                setPins(result.pins);
            }
        };
        window.addEventListener("resize", handleResize);
        waittingAPI();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <ImageList variant="masonry" cols={columns} gap={8}>
            {pins.map((pin) => (
                <ImageListItem
                    key={pin.id}
                    className="group duration-1000 rounded-2xl overflow-hidden"
                >
                    <img src={pin.url} alt={pin.title} loading="lazy" />
                    <div
                        className="cursor-zoom-in absolute left-0 right-0 top-0 bottom-0 bg-[#00000040] hidden duration-1000 group-hover:flex flex-col justify-between p-2">
                        <div>
                            <SaveButton pinId={pin.id} />
                        </div>
                        <div className="text-slate-50">
                            <div className="mb-1">{pin.title}</div>
                            <div className="flex items-center gap-3">
                                <img src={pin.user.avatar || "https://www.gravatar.com/avatar/"} alt={pin.user.username} className="w-10 max-w-10 h-10 rounded-full" />
                                <div>{pin.user.username}</div>
                            </div>
                        </div>
                    </div>
                </ImageListItem>
            ))}
        </ImageList>
    );
}

export default PinTable;