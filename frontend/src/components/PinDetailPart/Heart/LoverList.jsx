import { FaTimes } from "react-icons/fa";
function LoverList ({lovers, setShowLoverList}){

    const hideLoverList = () => {
        setShowLoverList(false);
    };
    const handleClickBox = (e) => {
        e.stopPropagation();
    };
    return (
        <div onClick={hideLoverList} className="fixed z-[150] top-0 left-0 right-0 bottom-0 bg-[#00000040]">
            <div onClick={handleClickBox} className="flex flex-col absolute bg-slate-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] min-w-[280px] sm:w-[460px] h-[65%]  rounded-xl my-3">
                <div className="flex justify-end p-3">
                    <FaTimes onClick={hideLoverList} className="text-3xl cursor-pointer" />
                </div>
                <div className="py-3 px-6 text-2xl border-b border-gray-400">
                    ❤️ {lovers.length}
                </div>
                <div className="flex-1 px-6 overflow-y-auto">
                    {lovers.map((lover) => 
                        <div key={lover.id} className="flex items-center justify-between py-4">
                            <div className="flex gap-3 items-center">
                                <img src={lover.avatar || "https://www.gravatar.com/avatar/"} alt="" className="w-14 h-14 object-cover rounded-full" />
                                <div className="text-xl font-semibold">{lover.username}</div>
                            </div>
                            <div className="text-2xl">
                                ❤️
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoverList;