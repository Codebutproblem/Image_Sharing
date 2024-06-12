import { useEffect, useState } from "react";
import { getInfoUser } from "../../../services/userAccountService";
import { logout } from "../../../services/authService";
import { useNavigate } from "react-router-dom";
import { ResponseMessage } from "../../../config/system";
function DropBox({ id }) {
  const [infoUser, setInfoUser] = useState({});
  const naviate = useNavigate();

  useEffect(() => {
    const waittingAPI = async () => {
      const result = await getInfoUser();
      if (result.message === ResponseMessage.GET_SUCCESS) {
        setInfoUser(result.user);
      }
    };
    waittingAPI();
  }, []);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    naviate("/user-account/login");
  };

  return (
    <div
      id={id}
      className="absolute top-full right-0 w-60 max-w-60 shadow-lg rounded-2xl bg-slate-50 p-3"
    >
      <div className="mb-5">
        <div className="text-sm mb-2">Tài khoản đăng nhập</div>
        <a
          href="/"
          className="flex items-center p-2 hover:bg-neutral-200 rounded-xl"
        >
          <img
            src={infoUser.avatar || "https://www.gravatar.com/avatar/"}
            alt="avatar"
            className="w-12 h-12 rounded-full overflow-hidden object-cover"
            loading="layzy"
          />
          <div className="mx-3 font-semibold">
            {infoUser.firstName || infoUser.lastName
              ? `${infoUser.firstName} ${infoUser.lastName}`
              : infoUser.username}
          </div>
        </a>
      </div>
      <div>
        <div className="text-sm mb-3">Tùy chọn khác</div>
        <ul className="list-none">
          <li>
            <a
              href="/"
              className="block p-2 font-semibold hover:bg-neutral-200 rounded-xl"
            >
              Cài đặt
            </a>
          </li>
          <li>
            <a
              href="/"
              className="block p-2 font-semibold hover:bg-neutral-200 rounded-xl"
            >
              Đóng góp ý kiến
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left block p-2 font-semibold hover:bg-neutral-200 rounded-xl"
            >
              Đăng xuất
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default DropBox;
