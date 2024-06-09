import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { checkLogin } from "../services/userAccountService";
import MyAlert from "../components/MyAlert";
function UserAccountDefault() {
  const [displayLayout, setDisplayLayout] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const waitingAPI = async () => {
      const login = await checkLogin();
      if (login) {
        navigate("/");
      } else {
        setDisplayLayout(true);
      }
    };
    waitingAPI();
  }, []);


  if (!displayLayout) return;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-[url('/images/bg.jpg')] bg-cover bg-no-repeat bg-fixed bg-center">
      </div>
      <MyAlert />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] flex items-center">
        <Outlet />
        <div className="flex-1">
          <div className="ms-auto max-w-[500px] text-orange-400 text-8xl font-bold leading-normal tracking-wide text-center">HI THERE! <span className=" text-sky-500">ENJOY MY WEB APP</span> </div>
        </div>
      </div>

    </>
  );
}

export default UserAccountDefault;
