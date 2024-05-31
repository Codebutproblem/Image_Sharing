import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInfoUser } from "../../services/userAccountService";

function InfoBox() {
    const { user_account_slug } = useParams();

    const [infoUser, setInfoUser] = useState({});

    useEffect(() => {
        const waittingApi = async () => {
            const result = await getInfoUser(user_account_slug);
            if (result.message == "get-info-user-success") {
                setInfoUser(result.infoUser);
            }
        };
        waittingApi();
    }, []);
    return (
        <div className="border-2 border-sky-700 w-[360px] min-h-[600px] bg-slate-50 rounded-3xl p-5">
            <div className="flex flex-col items-center gap-3 pb-10 border-b border-slate-500">
                <img src={infoUser.avatar || "https://www.gravatar.com/avatar/"} className="w-40 h-40 object-cover rounded-3xl" />
                <div className=" font-bold text-xl">{infoUser.username}</div>
                <div className="text-sm font-medium">Số người theo dõi: 100</div>
            </div>
            <div className="pt-4">
                <div className="flex gap-3 items-center mb-3">
                    <div className="font-bold">Email:</div>
                    <div>{infoUser.email}</div>
                </div>
                {(infoUser.first_name && infoUser.last_name) && (
                    <div className="flex gap-3 items-center mb-3">
                        <div className="font-bold">Họ và tên:</div>
                        <div>{infoUser.first_name} {infoUser.last_name}</div>
                    </div>
                )}
                <div className="flex gap-3 items-center mb-3">
                    <div className="font-bold">Giới tính:</div>
                    <div>{infoUser.gender == "male" ? "Nam" : "Nữ"}</div>
                </div>
                {infoUser.date_of_birth && (
                    <div className="flex gap-3 items-center mb-3">
                        <div className="font-bold">Ngày sinh:</div>
                        <div>{infoUser.date_of_birth}</div>
                    </div>
                )}
                {infoUser.nation && (
                    <div className="flex gap-3 items-center mb-3">
                        <div className="font-bold">Quốc tịch:</div>
                        <div>{infoUser.nation}</div>
                    </div>
                )}
                <div className="flex gap-3 items-center mb-3">
                    <div className="font-bold">Ngôn ngữ:</div>
                    <div>{infoUser.language}</div>
                </div>
                {infoUser.personal_link && (
                    <div className="flex gap-3 items-center mb-3">
                        <div className="font-bold">Link cá nhân:</div>
                        <div>{infoUser.personal_link}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InfoBox;